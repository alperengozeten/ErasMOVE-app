package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.ErasmusReplacementRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ErasmusReplacementRequestService {

    private final ErasmusReplacementRequestRepository erasmusReplacementRequestRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final NotificationService notificationService;

    @Autowired
    public ErasmusReplacementRequestService(ErasmusReplacementRequestRepository erasmusReplacementRequestRepository, OutgoingStudentRepository outgoingStudentRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, ErasmusUniversityService erasmusUniversityService, NotificationService notificationService) {
        this.erasmusReplacementRequestRepository = erasmusReplacementRequestRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.notificationService = notificationService;
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

        // allow max of 1 active requests for a student at a time!
        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( erasmusReplacementRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID +
                    " already has replacement request!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        if ( !outgoingStudent.getIsErasmus() ) {
            return new ResponseEntity<>("The Outgoing Student with id:" + outgoingStudentID + " is an Exchange Applicant, request failed!", HttpStatus.BAD_REQUEST);
        }

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorRepository.findById(departmentCoordinatorID).get();
        ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByID(erasmusReplacementRequest.getErasmusUniversity().getID());

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new replacement offer for Exchange University: " +
                erasmusUniversity.getUniversityName() + " by Department Coordinator: " +
                departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);
        return new ResponseEntity<>("Replacement Request has been sent!", HttpStatus.OK);
    }

    public void deleteErasmusReplacementRequestByID(Long id) {

        if ( !erasmusReplacementRequestRepository.existsById(id) ) {
            throw new IllegalStateException("Erasmus Replacement Request with id:" + id + " doesn't exist!");
        }

        erasmusReplacementRequestRepository.deleteById(id);
    }

    public ErasmusReplacementRequest getErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        return erasmusReplacementRequestOptional.get();
    }

    public List<ErasmusReplacementRequest> getErasmusReplacementRequestByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return erasmusReplacementRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public ErasmusReplacementRequest acceptErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request for Outgoing Student with id:" + outgoingStudentID
            + " doesn't exist!");
        }

        ErasmusReplacementRequest erasmusReplacementRequest = erasmusReplacementRequestOptional.get();

        if ( erasmusReplacementRequest.getStatus().equals("ACCEPTED") || erasmusReplacementRequest.getStatus().equals("DECLINED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
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

        erasmusReplacementRequest.setStatus("ACCEPTED"); // change the status if succesful
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);

        return erasmusReplacementRequest;
    }

    public ErasmusReplacementRequest declineErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request for Outgoing Student with id:" + outgoingStudentID
                    + " doesn't exist!");
        }

        ErasmusReplacementRequest erasmusReplacementRequest = erasmusReplacementRequestOptional.get();

        erasmusReplacementRequest.setStatus("DECLINED");
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);

        return erasmusReplacementRequest;
    }
}
