package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.ExchangeReplacementRequest;
import com.erasmuarrem.ErasMove.services.ExchangeReplacementRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exchangeReplacementRequest")
@CrossOrigin
public class ExchangeReplacementRequestController {

    private final ExchangeReplacementRequestService exchangeReplacementRequestService;

    @Autowired
    public ExchangeReplacementRequestController(ExchangeReplacementRequestService exchangeReplacementRequestService) {
        this.exchangeReplacementRequestService = exchangeReplacementRequestService;
    }

    @GetMapping
    public List<ExchangeReplacementRequest> getExchangeReplacementRequests() {
        return exchangeReplacementRequestService.getExchangeReplacementRequests();
    }

    @GetMapping("/{id}")
    public ExchangeReplacementRequest getExchangeReplacementRequestByID(@PathVariable("id") Long id) {
        return exchangeReplacementRequestService.getExchangeReplacementRequestByID(id);
    }

    @GetMapping("/outgoingStudent/{id}")
    public List<ExchangeReplacementRequest> getExchangeReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentId) {
        return exchangeReplacementRequestService.getExchangeReplacementRequestByOutgoingStudentID(outgoingStudentId);
    }

    @GetMapping("/departmentCoordinator/{id}")
    public List<ExchangeReplacementRequest> getExchangeReplacementRequestsByDepartmentCoordinatorID(@PathVariable("id") Long departmentCoordinatorID) {
        return exchangeReplacementRequestService.getExchangeReplacementRequestsByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    @GetMapping("/proposedRequests/departmentCoordinator/{id}")
    public List<ExchangeReplacementRequest> getProposedExchangeReplacementRequestsByDepartmentCoordinatorID(
            @PathVariable("id") Long departmentCoordinatorID
    ) {
        return exchangeReplacementRequestService.getProposedExchangeReplacementRequestsByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    @PostMapping("/propose")
    public ResponseEntity<String> proposeExchangeReplacementRequest(@RequestBody ExchangeReplacementRequest exchangeReplacementRequest) {
        return exchangeReplacementRequestService.proposeExchangeReplacementRequest(exchangeReplacementRequest);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addExchangeReplacementRequest(@RequestBody ExchangeReplacementRequest exchangeReplacementRequest) {
        return exchangeReplacementRequestService.addExchangeReplacementRequest(exchangeReplacementRequest);
    }

    @PostMapping("/accept/{id}")
    public ExchangeReplacementRequest acceptExchangeReplacementRequestByExchangeReplacementRequestID(@PathVariable("id") Long requestID) {
        return exchangeReplacementRequestService.acceptExchangeReplacementRequestByExchangeReplacementRequestID(requestID);
    }

    @PostMapping("/decline/{id}")
    public ExchangeReplacementRequest declineExchangeReplacementRequestByExchangeReplacementRequestID(@PathVariable("id") Long requestID) {
        return exchangeReplacementRequestService.declineExchangeReplacementRequestByExchangeReplacementRequestID(requestID);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExchangeReplacementRequestByID(@PathVariable("id") Long id) {
        exchangeReplacementRequestService.deleteExchangeReplacementRequestByID(id);
    }
}
