package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@CrossOrigin
public class ErasmusReplacementRequestService {

    private final ErasmusReplacementRequestRepository erasmusReplacementRequestRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final NotificationService notificationService;
    private final ApplicationRepository applicationRepository;
    private final DepartmentRepository departmentRepository;
    private final DepartmentCoordinatorService departmentCoordinatorService;
    private final ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository;

    @Autowired
    public ErasmusReplacementRequestService(ErasmusReplacementRequestRepository erasmusReplacementRequestRepository, OutgoingStudentRepository outgoingStudentRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, ErasmusUniversityService erasmusUniversityService, NotificationService notificationService, ApplicationRepository applicationRepository, DepartmentRepository departmentRepository, DepartmentCoordinatorService departmentCoordinatorService, ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository) {
        this.erasmusReplacementRequestRepository = erasmusReplacementRequestRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.notificationService = notificationService;
        this.applicationRepository = applicationRepository;
        this.departmentRepository = departmentRepository;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.erasmusUniversityDepartmentRepository = erasmusUniversityDepartmentRepository;
    }

    public List<ErasmusReplacementRequest> getErasmusReplacementRequests() {
        return erasmusReplacementRequestRepository.findAll();
    }

    public ErasmusReplacementRequest getErasmusReplacementRequestByID(Long id) {
        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findById(id);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request with id:" + id + " doesn't exist!");
        }

        return erasmusReplacementRequestOptional.get();
    }

    public ResponseEntity<String> addErasmusReplacementRequest(ErasmusReplacementRequest erasmusReplacementRequest) {

        Long outgoingStudentID = erasmusReplacementRequest.getStudent().getID();
        Long departmentCoordinatorID = erasmusReplacementRequest.getDepartmentCoordinator().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            return new ResponseEntity<>("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if ( erasmusReplacementRequest.getStatus() != null && !erasmusReplacementRequest.getStatus().equals("PROPOSAL") ) {
            return new ResponseEntity<>("Erasmus Replacement Request has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // allow max of 1 active requests for a student at a time!
        List<ErasmusReplacementRequest> erasmusReplacementRequestList = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        for (ErasmusReplacementRequest replacementRequest : erasmusReplacementRequestList) {
            if ( replacementRequest.getStatus().equals("WAITING") ) {
                return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already a waiting request!", HttpStatus.BAD_REQUEST);
            }
            else if ( replacementRequest.getStatus().equals("ACCEPTED") ) {
                return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already accepted a replacement request!", HttpStatus.BAD_REQUEST);
            }
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        if ( !outgoingStudent.getIsErasmus() ) {
            return new ResponseEntity<>("The Outgoing Student with id:" + outgoingStudentID + " is an Exchange Applicant, request failed!", HttpStatus.BAD_REQUEST);
        }

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorRepository.findById(departmentCoordinatorID).get();
        ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByID(erasmusReplacementRequest.getErasmusUniversity().getID());

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                        erasmusUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                );

        // decrease the quota when the request is waiting!
        erasmusUniversityDepartment.setQuota(erasmusUniversityDepartment.getQuota() - 1);

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new replacement offer for Erasmus University: " +
                erasmusUniversity.getUniversityName() + " by Department Coordinator: " +
                departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        erasmusReplacementRequest.setStatus("WAITING");
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);
        return new ResponseEntity<>("Replacement Request has been sent!", HttpStatus.OK);
    }

    public void deleteErasmusReplacementRequestByID(Long id) {

        if ( !erasmusReplacementRequestRepository.existsById(id) ) {
            throw new IllegalStateException("Erasmus Replacement Request with id:" + id + " doesn't exist!");
        }

        erasmusReplacementRequestRepository.deleteById(id);
    }

    public List<ErasmusReplacementRequest> getErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return erasmusReplacementRequestRepository.findByStudentID(outgoingStudentID);
    }

    public List<ErasmusReplacementRequest> getErasmusReplacementRequestByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return erasmusReplacementRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public ErasmusReplacementRequest acceptErasmusReplacementRequestByErasmusReplacementRequestID(Long erasmusReplacementRequestID) {

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findById(erasmusReplacementRequestID);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request with id: " + erasmusReplacementRequestID + " doesn't exist!");
        }

        ErasmusReplacementRequest erasmusReplacementRequest = erasmusReplacementRequestOptional.get();
        Long outgoingStudentID = erasmusReplacementRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        if ( erasmusReplacementRequest.getStatus().equals("ACCEPTED") || erasmusReplacementRequest.getStatus().equals("DECLINED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
        }

        if ( erasmusReplacementRequest.getStatus().equals("PROPOSAL") ) {
            throw new IllegalStateException("The Erasmus Replacement Request has not been added by the Department Coordinator yet!");
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get(); // get the student
        String outgoingStudentDepartmentName = outgoingStudent.getDepartment().getDepartmentName(); // get the department name
        ErasmusUniversity erasmusUniversity = erasmusReplacementRequest.getErasmusUniversity(); // get the university

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                        erasmusUniversity.getID(), outgoingStudentDepartmentName
                ); // find the department using department name and university

        erasmusUniversityDepartmentService.addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(
                erasmusUniversityDepartment.getID(),
                outgoingStudentID
        ); // add the student to the department

        DepartmentCoordinator departmentCoordinator = erasmusReplacementRequest.getDepartmentCoordinator();

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("The replacement offer for Erasmus University: " +
                erasmusUniversity.getUniversityName() + " has been accepted by the Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification);

        erasmusReplacementRequest.setStatus("ACCEPTED"); // change the status if successful
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);

        return erasmusReplacementRequest;
    }

    public ErasmusReplacementRequest declineErasmusReplacementRequestByErasmusReplacementRequestID(Long erasmusReplacementRequestID) {

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findById(erasmusReplacementRequestID);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request with id: " + erasmusReplacementRequestID + " doesn't exist!");
        }

        ErasmusReplacementRequest erasmusReplacementRequest = erasmusReplacementRequestOptional.get();
        Long outgoingStudentID = erasmusReplacementRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        if ( erasmusReplacementRequest.getStatus().equals("ACCEPTED") || erasmusReplacementRequest.getStatus().equals("DECLINED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
        }

        if ( erasmusReplacementRequest.getStatus().equals("PROPOSAL") ) {
            throw new IllegalStateException("The Erasmus Replacement Request has not been added by the Department Coordinator yet!");
        }

        ErasmusUniversity erasmusUniversity = erasmusReplacementRequest.getErasmusUniversity();
        OutgoingStudent outgoingStudent = erasmusReplacementRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = erasmusReplacementRequest.getDepartmentCoordinator();

        // increase the quota by 1 since the request is declined
        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                        erasmusUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                );

        // decrease the quota when the request is waiting!
        erasmusUniversityDepartment.setQuota(erasmusUniversityDepartment.getQuota() + 1);

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("The replacement offer for Erasmus University: " +
                erasmusUniversity.getUniversityName() + " has been declined by the Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        erasmusReplacementRequest.setStatus("DECLINED");
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);

        return erasmusReplacementRequest;
    }

    public ResponseEntity<String> proposeErasmusReplacementRequest(ErasmusReplacementRequest erasmusReplacementRequest) {
        Long outgoingStudentID = erasmusReplacementRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();
        Department department = outgoingStudent.getDepartment();

        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository
                .findByDepartmentID(department.getID());

        if ( !departmentCoordinatorOptional.isPresent() ) {
            return new ResponseEntity<>("Department Coordinator for department:" + department.getDepartmentName() + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        // allow max of 1 proposal or accepted for a student at a time!
        List<ErasmusReplacementRequest> erasmusReplacementRequestList = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        for (ErasmusReplacementRequest replacementRequest : erasmusReplacementRequestList) {
            switch (replacementRequest.getStatus()) {
                case "ACCEPTED":
                    return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already accepted an offer!", HttpStatus.BAD_REQUEST);
                //case "PROPOSAL":
                //    return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already a proposal!", HttpStatus.BAD_REQUEST);
                case "WAITING":
                    return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already a waiting replacement offer!", HttpStatus.BAD_REQUEST);
            }
        }

        if ( !outgoingStudent.getIsErasmus() ) {
            return new ResponseEntity<>("The Outgoing Student with id:" + outgoingStudentID + " is an Exchange Applicant, request failed!", HttpStatus.BAD_REQUEST);
        }

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorOptional.get();
        ErasmusUniversity erasmusUniversity = erasmusUniversityService
                .getErasmusUniversityByID(erasmusReplacementRequest.getErasmusUniversity().getID());

        if ( erasmusUniversity == null ) {
            return new ResponseEntity<>("There is no Erasmus University with id:" + erasmusReplacementRequest.getErasmusUniversity().getID() + "!", HttpStatus.BAD_REQUEST);
        }

        // send notification here?
        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("You have a new proposed replacement offer for Erasmus University: " +
                erasmusUniversity.getUniversityName() + " to the Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        erasmusReplacementRequest.setDepartmentCoordinator(departmentCoordinator);
        erasmusReplacementRequest.setStatus("PROPOSAL");
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);
        return new ResponseEntity<>("Erasmus Replacement Request has been proposed to the Department Coordinator: " + departmentCoordinator.getName() + "!", HttpStatus.OK);
    }

    public List<ErasmusReplacementRequest> getProposedErasmusReplacementRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id: " + departmentCoordinatorID + " doesn't exist!");
        }

        return erasmusReplacementRequestRepository.findByStatusAndDepartmentCoordinator_ID("PROPOSAL", departmentCoordinatorID);
    }

    @Transactional
    public String makeErasmusProposalsToDepartmentCoordinator(Long departmentID) {

        Optional<Department> departmentOptional = departmentRepository.findById(departmentID);

        if ( !departmentOptional.isPresent() ) {
            return "Department with id:" + departmentID + " doesn't exist!";
        }

        Department department = departmentOptional.get();
        DepartmentCoordinator departmentCoordinator = departmentCoordinatorService
                .getDepartmentCoordinatorByDepartmentId(departmentID);

        List<ErasmusUniversityDepartment> erasmusUniversityDepartmentList = erasmusUniversityDepartmentRepository
                .findByDepartmentName(department.getDepartmentName());
        List<Application> erasmusApplicationList = applicationRepository.findByOutgoingStudent_IsErasmusAndOutgoingStudent_Department_ID(
                true, departmentID
        );

        erasmusReplacementRequestRepository.deleteAllByStatusAndDepartmentCoordinator_ID(
                "PROPOSAL", departmentCoordinator.getID()
        );

        for (ErasmusUniversityDepartment erasmusUniversityDepartment : erasmusUniversityDepartmentList) {
            if ( erasmusUniversityDepartment.getQuota() > 0 ) {

                ErasmusUniversity erasmusUniversity = erasmusUniversityDepartment.getErasmusUniversity();
                double maxScore = -1;
                double maxNonSelectedScore = -1;
                Application maxApplication = null;
                Application maxNonSelectedApplication = null;

                for (Application application : erasmusApplicationList) {
                    // check if the student already has a waiting proposal??
                    Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository.findByStatusAndStudent_ID(
                            "WAITING", application.getOutgoingStudent().getID()
                    );
                    if ( erasmusReplacementRequestOptional.isPresent() ) {
                        continue;
                    }
                    if ( application.getAdmittedStatus().equalsIgnoreCase("NOT ADMITTED") ) {
                        if ( application.getSelectedUniversities().contains(erasmusUniversity) ) {
                            if ( maxScore < application.getApplicationScore() ) {
                                maxScore = application.getApplicationScore();
                                maxApplication = application;
                            }
                        }
                        else if ( maxApplication == null ) {
                            if ( maxNonSelectedScore < application.getApplicationScore() ) {
                                maxNonSelectedScore = application.getApplicationScore();
                                maxNonSelectedApplication = application;
                            }
                        }
                    }
                }

                // send proposal to department coordinator
                if ( maxApplication == null ) {
                    maxApplication = maxNonSelectedApplication;
                }

                if ( maxApplication != null ) {
                    ErasmusReplacementRequest newReplacementRequest = new ErasmusReplacementRequest();
                    newReplacementRequest.setStudent(maxApplication.getOutgoingStudent());
                    newReplacementRequest.setErasmusUniversity(erasmusUniversity);
                    newReplacementRequest.setInfo("Replacement Request for the university: " + erasmusUniversity.getUniversityName());
                    proposeErasmusReplacementRequest(newReplacementRequest);
                }
            }
        }

        return "Successfully created the proposals!";
    }
}
