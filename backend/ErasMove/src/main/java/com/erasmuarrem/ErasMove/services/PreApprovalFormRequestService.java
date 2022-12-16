package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PreApprovalFormRequestService {

    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final DepartmentCoordinatorService departmentCoordinatorService;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ExchangeUniversityService exchangeUniversityService;
    private final NotificationService notificationService;
    private final ApplicationService applicationService;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public PreApprovalFormRequestService(PreApprovalFormRequestRepository preApprovalFormRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, DepartmentCoordinatorService departmentCoordinatorService, OutgoingStudentRepository outgoingStudentRepository, ErasmusUniversityService erasmusUniversityService, ExchangeUniversityService exchangeUniversityService, NotificationService notificationService, ApplicationService applicationService, DepartmentRepository departmentRepository) {
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.erasmusUniversityService = erasmusUniversityService;
        this.exchangeUniversityService = exchangeUniversityService;
        this.notificationService = notificationService;
        this.applicationService = applicationService;
        this.departmentRepository = departmentRepository;
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequests() {
        return preApprovalFormRequestRepository.findAll();
    }

    public PreApprovalFormRequest getPreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        return preApprovalFormRequestOptional.get();
    }

    public ResponseEntity<ResponseMessage> addPreApprovalFormRequest(PreApprovalFormRequest preApprovalFormRequest) {
        Long outgoingStudentID = preApprovalFormRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorService
                .getDepartmentCoordinatorByDepartmentId(outgoingStudent.getDepartment().getID());

        if ( departmentCoordinator == null ) {
            return new ResponseEntity<>(new ResponseMessage("There is no Department Coordinator for department:" + outgoingStudent.getDepartment().getDepartmentName() + " to respond!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!", (long) -1), HttpStatus.BAD_REQUEST);
            }
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!", (long) -1), HttpStatus.BAD_REQUEST);
            }
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);

        // the student shouldn't have a waiting or accepted request
        for (PreApprovalFormRequest approvalFormRequest: preApprovalFormRequests) {
            if ( approvalFormRequest.getStatus().equals("ACCEPTED") ) {
                return new ResponseEntity<>(new ResponseMessage("Student with id:" + outgoingStudentID + " already has an accepted Pre-Approval Form!", (long) -1), HttpStatus.BAD_REQUEST);
            }
            else if ( approvalFormRequest.getStatus().equals("WAITING") ) {
                return new ResponseEntity<>(new ResponseMessage("Student with id:" + outgoingStudentID + " already has a waiting Pre-Approval Form!", (long) -1), HttpStatus.BAD_REQUEST);
            }
        }

        Application application = applicationService.getByOutgoingStudentID(outgoingStudentID);

        if ( application == null ) {
            return new ResponseEntity<>(new ResponseMessage("Student with id:" + outgoingStudentID + " doesn't currently have an application!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        application.setPreApprovalFormStatus("WAITING");

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new Pre-Approval Form submitted by the Outgoing Student: " +
                outgoingStudent.getName() + " and waiting for the response!");

        notificationService.saveNotification(newNotification);

        preApprovalFormRequest.setDepartmentCoordinator(departmentCoordinator); // set the department coordinator
        preApprovalFormRequest.setStatus("WAITING"); // set status
        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        System.out.println("id:" + preApprovalFormRequest.getID());

        return new ResponseEntity<>(new ResponseMessage("Pre-Approval Form is submitted!", preApprovalFormRequest.getID()), HttpStatus.OK);
    }

    public void deletePreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        preApprovalFormRequestRepository.deleteById(id);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentCoordinatorIDAndOutgoingStudentID(Long departmentCoordinatorID, Long outgoingStudentID) {
        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByDepartmentCoordinatorIDAndStudentID(departmentCoordinatorID, outgoingStudentID);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);
    }

    public ResponseEntity<String> declinePreApprovalFormRequest(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        if ( preApprovalFormRequest.getStatus().equals("ACCEPTED") || preApprovalFormRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = preApprovalFormRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = preApprovalFormRequest.getDepartmentCoordinator();

        Application application = applicationService.getByOutgoingStudentID(outgoingStudent.getID());

        if ( application == null ) {
            return new ResponseEntity<>("Student with id:" + outgoingStudent.getID() + " doesn't currently have an application!", HttpStatus.BAD_REQUEST);
        }

        application.setPreApprovalFormStatus("DECLINED");

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Pre-Approval form has been rejected by the Department Coordinator: " + departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("DECLINED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has been declined!", HttpStatus.OK);
    }

    public ResponseEntity<String> acceptPreApprovalFormRequestByID(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        if ( preApprovalFormRequest.getStatus().equals("ACCEPTED") || preApprovalFormRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = preApprovalFormRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = preApprovalFormRequest.getDepartmentCoordinator();

        Application application = applicationService.getByOutgoingStudentID(outgoingStudent.getID());

        if ( application == null ) {
            return new ResponseEntity<>("Student with id:" + outgoingStudent.getID() + " doesn't currently have an application!", HttpStatus.BAD_REQUEST);
        }

        application.setPreApprovalFormStatus("ACCEPTED");

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Pre-Approval form has been rejected by the Department Coordinator: " + departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("ACCEPTED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has been accepted!", HttpStatus.OK);
    }

    @Transactional
    public String deletePreApprovalFormRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = getPreApprovalFormRequestsByOutgoingStudentID(
                outgoingStudentID
        );

        if ( preApprovalFormRequests.size() == 0 ) {
            return "Outgoing Student has not yet created a Pre-Approval Form!";
        }

        preApprovalFormRequestRepository.deletePreApprovalFormRequestsByStudent_ID(outgoingStudentID);
        return "All Pre-Approval Forms of Outgoing Student with id:" + outgoingStudentID + " have been deleted!";
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentID(Long departmentID) {

        if ( !departmentRepository.existsById(departmentID) ) {
            throw new IllegalStateException("Department with id:" + departmentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByStudent_Department_ID(departmentID);
    }
}
