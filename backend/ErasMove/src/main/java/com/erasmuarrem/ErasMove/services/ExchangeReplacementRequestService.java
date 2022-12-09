package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ExchangeReplacementRequest;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeReplacementRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeReplacementRequestService {

    private final ExchangeReplacementRequestRepository exchangeReplacementRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;

    @Autowired
    public ExchangeReplacementRequestService(ExchangeReplacementRequestRepository exchangeReplacementRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository) {
        this.exchangeReplacementRequestRepository = exchangeReplacementRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
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

    public void addExchangeReplacementRequest(ExchangeReplacementRequest exchangeReplacementRequest) {

        Long outgoingStudentID = exchangeReplacementRequest.getStudent().getID(); // get the ID of the student
        Long departmentCoordinatorID = exchangeReplacementRequest.getDepartmentCoordinator().getID(); // get the id of
                                                                                                    // the department coordinator

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        // allow max of 1 active requests for a student at a time!
        Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( exchangeReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID +
                    " already has replacement request!");
        }

        exchangeReplacementRequestRepository.save(exchangeReplacementRequest);
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
}
