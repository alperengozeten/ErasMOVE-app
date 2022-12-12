package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.ErasmusReplacementRequest;
import com.erasmuarrem.ErasMove.services.ErasmusReplacementRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/erasmusReplacementRequest")
public class ErasmusReplacementRequestController {

    private final ErasmusReplacementRequestService erasmusReplacementRequestService;

    @Autowired
    public ErasmusReplacementRequestController(ErasmusReplacementRequestService erasmusReplacementRequestService) {
        this.erasmusReplacementRequestService = erasmusReplacementRequestService;
    }

    @GetMapping
    public List<ErasmusReplacementRequest> getErasmusReplacementRequests() {
        return erasmusReplacementRequestService.getErasmusReplacementRequests();
    }

    @GetMapping("/{id}")
    public ErasmusReplacementRequest getErasmusReplacementRequestByID(@PathVariable("id") Long id) {
        return erasmusReplacementRequestService.getErasmusReplacementRequestByID(id);
    }

    @GetMapping("/outgoingStudent/{id}")
    public ErasmusReplacementRequest getErasmusReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentID) {
        return erasmusReplacementRequestService.getErasmusReplacementRequestByOutgoingStudentID(outgoingStudentID);
    }

    @GetMapping("/departmentCoordinator/{id}")
    public List<ErasmusReplacementRequest> getErasmusReplacementRequestsByDepartmentCoordinatorID(
            @PathVariable("id") Long departmentCoordinatorID) {
        return erasmusReplacementRequestService.getErasmusReplacementRequestByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addErasmusReplacementRequest(@RequestBody ErasmusReplacementRequest erasmusReplacementRequest) {
        return erasmusReplacementRequestService.addErasmusReplacementRequest(erasmusReplacementRequest);
    }

    @PostMapping("/outgoingStudent/{id}/accept")
    public ErasmusReplacementRequest acceptErasmusReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentID) {
        return erasmusReplacementRequestService.acceptErasmusReplacementRequestByOutgoingStudentID(outgoingStudentID);
    }

    @PostMapping("/outgoingStudent/{id}/decline")
    public ErasmusReplacementRequest declineErasmusReplacementRequestByOutgoingStudentID(@PathVariable("id") Long outgoingStudentID) {
        return erasmusReplacementRequestService.declineErasmusReplacementRequestByOutgoingStudentID(outgoingStudentID);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteErasmusReplacementRequestByID(@PathVariable("id") Long id) {
        erasmusReplacementRequestService.deleteErasmusReplacementRequestByID(id);
    }
}
