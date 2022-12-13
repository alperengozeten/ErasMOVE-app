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
    public ExchangeReplacementRequest getExchangeReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentId) {
        return exchangeReplacementRequestService.getExchangeReplacementRequestByOutgoingStudentID(outgoingStudentId);
    }

    @GetMapping("/departmentCoordinator/{id}")
    public List<ExchangeReplacementRequest> getExchangeReplacementRequestsByDepartmentCoordinatorID(@PathVariable("id") Long departmentCoordinatorID) {
        return exchangeReplacementRequestService.getExchangeReplacementRequestsByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addExchangeReplacementRequest(@RequestBody ExchangeReplacementRequest exchangeReplacementRequest) {
        return exchangeReplacementRequestService.addExchangeReplacementRequest(exchangeReplacementRequest);
    }

    @PostMapping("/outgoingStudent/{id}/accept")
    public ExchangeReplacementRequest acceptExchangeReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentID) {
        return exchangeReplacementRequestService.acceptExchangeReplacementRequestByOutgoingStudentID(outgoingStudentID);
    }

    @PostMapping("/outgoingStudent/{id}/decline")
    public ExchangeReplacementRequest declineExchangeReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentID) {
        return exchangeReplacementRequestService.declineExchangeReplacementRequestByOutgoingStudentID(outgoingStudentID);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExchangeReplacementRequestByID(@PathVariable("id") Long id) {
        exchangeReplacementRequestService.deleteExchangeReplacementRequestByID(id);
    }
}
