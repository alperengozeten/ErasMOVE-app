package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeReplacementRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExchangeReplacementRequestService {

    private final ExchangeReplacementRequestRepository exchangeReplacementRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ExchangeUniversityService exchangeUniversityService;
    private final NotificationService notificationService;

    @Autowired
    public ExchangeReplacementRequestService(ExchangeReplacementRequestRepository exchangeReplacementRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository, ExchangeUniversityService exchangeUniversityService, NotificationService notificationService) {
        this.exchangeReplacementRequestRepository = exchangeReplacementRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.exchangeUniversityService = exchangeUniversityService;
        this.notificationService = notificationService;
    }

    public List<ExchangeReplacementRequest> getExchangeReplacementRequests() {
        return exchangeReplacementRequestRepository.findAll();
    }

    public ExchangeReplacementRequest getExchangeReplacementRequestByID(Long id) {
        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findById(id);

        if ( !exchangeReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Exchange Replacement Request with id:" + id + " doesn't exist!");
        }

        return exchangeReplacementRequestOptional.get();
    }

    public ResponseEntity<String> addExchangeReplacementRequest(ExchangeReplacementRequest exchangeReplacementRequest) {

        Long outgoingStudentID = exchangeReplacementRequest.getStudent().getID();
        Long departmentCoordinatorID = exchangeReplacementRequest.getDepartmentCoordinator().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            return new ResponseEntity<>("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if ( exchangeReplacementRequest.getStatus() != null && !exchangeReplacementRequest.getStatus().equals("PROPOSAL") ) {
            return new ResponseEntity<>("Exchange Replacement Request has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // allow max of 1 active requests for a student at a time!
        List<ExchangeReplacementRequest> exchangeReplacementRequestList = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        for (ExchangeReplacementRequest replacementRequest : exchangeReplacementRequestList) {
            if ( replacementRequest.getStatus().equals("WAITING") ) {
                return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already a waiting request!", HttpStatus.BAD_REQUEST);
            }
            else if ( replacementRequest.getStatus().equals("ACCEPTED") ) {
                return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already accepted a replacement request!", HttpStatus.BAD_REQUEST);
            }
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        if ( outgoingStudent.getIsErasmus() ) {
            return new ResponseEntity<>("The Outgoing Student with id:" + outgoingStudentID + " is an Erasmus Applicant, request failed!", HttpStatus.BAD_REQUEST);
        }

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorRepository.findById(departmentCoordinatorID).get();
        ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByID(exchangeReplacementRequest.getExchangeUniversity().getID());

        // decrease the quota by 1 until the request is responded
        exchangeUniversity.setUniversityQuota(exchangeUniversity.getUniversityQuota() - 1);

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new replacement offer for Exchange University: " +
                exchangeUniversity.getUniversityName() + " by Department Coordinator: " +
                departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        exchangeReplacementRequest.setStatus("WAITING");
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest); // save to the database
        return new ResponseEntity<>("Replacement Request has been sent!", HttpStatus.OK);
    }

    public void deleteExchangeReplacementRequestByID(Long id) {
        if ( !exchangeReplacementRequestRepository.existsById(id) ) {
            throw new IllegalStateException("Exchange Replacement Request with id:" + id + " doesn't exist!");
        }

        exchangeReplacementRequestRepository.deleteById(id);
    }

    public List<ExchangeReplacementRequest> getExchangeReplacementRequestByOutgoingStudentID(Long outgoingStudentId) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentId) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentId + " doesn't exist!");
        }

        return exchangeReplacementRequestRepository.findByStudentID(outgoingStudentId);
    }

    public List<ExchangeReplacementRequest> getExchangeReplacementRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return exchangeReplacementRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public ExchangeReplacementRequest acceptExchangeReplacementRequestByExchangeReplacementRequestID(Long exchangeReplacementRequestID) {

        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findById(exchangeReplacementRequestID);

        if ( !exchangeReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Exchange Replacement Request with id: " + exchangeReplacementRequestID + " doesn't exist!");
        }

        ExchangeReplacementRequest exchangeReplacementRequest = exchangeReplacementRequestOptional.get();
        Long outgoingStudentID = exchangeReplacementRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        if ( exchangeReplacementRequest.getStatus().equals("ACCEPTED") || exchangeReplacementRequest.getStatus().equals("DECLINED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
        }

        if ( exchangeReplacementRequest.getStatus().equals("PROPOSAL") ) {
            throw new IllegalStateException("The Exchange Replacement Request has not been added by the Department Coordinator yet!");
        }

        ExchangeUniversity exchangeUniversity = exchangeReplacementRequest.getExchangeUniversity(); // get the exchange university

        exchangeUniversityService.addOutgoingStudentByIDAndOutgoingStudentID(
                exchangeUniversity.getID(),
                outgoingStudentID
        ); // add the student using the ExchangeUniversityService class

        OutgoingStudent outgoingStudent = exchangeReplacementRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = exchangeReplacementRequest.getDepartmentCoordinator();

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("The replacement offer for Exchange University: " +
                exchangeUniversity.getUniversityName() + " has been accepted by the Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification);

        exchangeReplacementRequest.setStatus("ACCEPTED"); // set the status
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest); // save back to the repository

        return exchangeReplacementRequest;
    }

    public ExchangeReplacementRequest declineExchangeReplacementRequestByExchangeReplacementRequestID(Long exchangeReplacementRequestID) {

        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findById(exchangeReplacementRequestID);

        if ( !exchangeReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Exchange Replacement Request with id: " + exchangeReplacementRequestID + " doesn't exist!");
        }

        ExchangeReplacementRequest exchangeReplacementRequest = exchangeReplacementRequestOptional.get();
        Long outgoingStudentID = exchangeReplacementRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        if ( exchangeReplacementRequest.getStatus().equals("ACCEPTED") || exchangeReplacementRequest.getStatus().equals("DECLINED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
        }

        if ( exchangeReplacementRequest.getStatus().equals("PROPOSAL") ) {
            throw new IllegalStateException("The Exchange Replacement Request has not been added by the Department Coordinator yet!");
        }

        ExchangeUniversity exchangeUniversity = exchangeReplacementRequest.getExchangeUniversity();
        OutgoingStudent outgoingStudent = exchangeReplacementRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = exchangeReplacementRequest.getDepartmentCoordinator();

        // increase the quota by 1 since the request is declined
        exchangeUniversity.setUniversityQuota(exchangeUniversity.getUniversityQuota() + 1);

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("The replacement offer for Exchange University: " +
                exchangeUniversity.getUniversityName() + " has been declined by the Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification);

        exchangeReplacementRequest.setStatus("DECLINED");
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest);

        return exchangeReplacementRequest;
    }

    public ResponseEntity<String> proposeExchangeReplacementRequest(ExchangeReplacementRequest exchangeReplacementRequest) {
        Long outgoingStudentID = exchangeReplacementRequest.getStudent().getID();

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
        List<ExchangeReplacementRequest> exchangeReplacementRequestList = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        for (ExchangeReplacementRequest replacementRequest : exchangeReplacementRequestList) {
            switch (replacementRequest.getStatus()) {
                case "ACCEPTED":
                    return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already accepted an offer!", HttpStatus.BAD_REQUEST);
                //case "PROPOSAL":
                //    return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already a proposal!", HttpStatus.BAD_REQUEST);
                case "WAITING":
                    return new ResponseEntity<>("The Outgoing Student with id: " + outgoingStudentID + " has already a waiting replacement offer!", HttpStatus.BAD_REQUEST);
            }
        }

        if ( outgoingStudent.getIsErasmus() ) {
            return new ResponseEntity<>("The Outgoing Student with id:" + outgoingStudentID + " is an Erasmus Applicant, request failed!", HttpStatus.BAD_REQUEST);
        }

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorOptional.get();
        ExchangeUniversity exchangeUniversity = exchangeUniversityService
                .getExchangeUniversityByID(exchangeReplacementRequest.getExchangeUniversity().getID());

        if ( exchangeUniversity == null ) {
            return new ResponseEntity<>("There is no Exchange University with id:" + exchangeReplacementRequest.getExchangeUniversity().getID() + "!", HttpStatus.BAD_REQUEST);
        }

        // send notification here?
        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("You have a new proposed replacement offer for Exchange University: " +
                exchangeUniversity.getUniversityName() + " to the Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        exchangeReplacementRequest.setDepartmentCoordinator(departmentCoordinator);
        exchangeReplacementRequest.setStatus("PROPOSAL");
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest);
        return new ResponseEntity<>("Exchange Replacement Request has been proposed to the Department Coordinator: " + departmentCoordinator.getName() + "!", HttpStatus.OK);
    }

    public List<ExchangeReplacementRequest> getProposedExchangeReplacementRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id: " + departmentCoordinatorID + " doesn't exist!");
        }

        return exchangeReplacementRequestRepository.findByStatusAndDepartmentCoordinator_ID("PROPOSAL", departmentCoordinatorID);
    }
}
