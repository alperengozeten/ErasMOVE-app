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

        Long outgoingStudentID = exchangeReplacementRequest.getStudent().getID(); // get the ID of the student
        Long departmentCoordinatorID = exchangeReplacementRequest.getDepartmentCoordinator().getID(); // get the id of
                                                                                                    // the department coordinator

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            return new ResponseEntity<>("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        // allow max of 1 active requests for a student at a time!
        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( exchangeReplacementRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID +
                    " already has replacement request!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();
        DepartmentCoordinator departmentCoordinator = departmentCoordinatorRepository.findById(departmentCoordinatorID).get();
        ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByID(exchangeReplacementRequest.getExchangeUniversity().getID());

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new replacement offer for Exchange University: " +
                exchangeUniversity.getUniversityName() + " by Department Coordinator: " +
                departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest); // save to the database
        return new ResponseEntity<>("Replacement Request has been sent!", HttpStatus.OK);
    }

    public void deleteExchangeReplacementRequestByID(Long id) {
        if ( !exchangeReplacementRequestRepository.existsById(id) ) {
            throw new IllegalStateException("Exchange Replacement Request with id:" + id + " doesn't exist!");
        }

        exchangeReplacementRequestRepository.deleteById(id);
    }

    public ExchangeReplacementRequest getExchangeReplacementRequestByOutgoingStudentID(Long outgoingStudentId) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentId) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentId + " doesn't exist!");
        }

        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentId);

        return exchangeReplacementRequestOptional.get();
    }

    public List<ExchangeReplacementRequest> getExchangeReplacementRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return exchangeReplacementRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public ExchangeReplacementRequest acceptExchangeReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( !exchangeReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request for Outgoing Student with id:" + outgoingStudentID
                    + " doesn't exist!");
        }

        ExchangeReplacementRequest exchangeReplacementRequest = exchangeReplacementRequestOptional.get();

        if ( exchangeReplacementRequest.getStatus().equals("DECLINED") || exchangeReplacementRequest.getStatus().equals("ACCEPTED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
        }

        ExchangeUniversity exchangeUniversity = exchangeReplacementRequest.getExchangeUniversity(); // get the exchange university

        exchangeUniversityService.addOutgoingStudentByIDAndOutgoingStudentID(
                exchangeUniversity.getID(),
                outgoingStudentID
        ); // add the student using the ExchangeUniversityService class

        exchangeReplacementRequest.setStatus("ACCEPTED"); // set the status
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest); // save back to the repository

        return exchangeReplacementRequest;
    }

    public ExchangeReplacementRequest declineExchangeReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( !exchangeReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Exchange Replacement Request doesn't exist for Outgoing Student with id:" + outgoingStudentID + "!");
        }

        ExchangeReplacementRequest exchangeReplacementRequest = exchangeReplacementRequestOptional.get();

        exchangeReplacementRequest.setStatus("DECLINED");
        exchangeReplacementRequestRepository.save(exchangeReplacementRequest);

        return exchangeReplacementRequest;
    }
}
