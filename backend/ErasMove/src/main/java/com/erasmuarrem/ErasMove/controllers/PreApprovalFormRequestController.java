package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.PreApprovalFormRequest;
import com.erasmuarrem.ErasMove.services.PreApprovalFormRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/preApprovalForm")
public class PreApprovalFormRequestController {

    private final PreApprovalFormRequestService preApprovalFormRequestService;

    @Autowired
    public PreApprovalFormRequestController(PreApprovalFormRequestService preApprovalFormRequestService) {
        this.preApprovalFormRequestService = preApprovalFormRequestService;
    }

    @GetMapping
    public List<PreApprovalFormRequest> getPreApprovalFormRequests() {
        return preApprovalFormRequestService.getPreApprovalFormRequests();
    }

    @GetMapping("/{id}")
    public PreApprovalFormRequest getPreApprovalFormRequestByID(@PathVariable("id") Long id) {
        return preApprovalFormRequestService.getPreApprovalFormRequestByID(id);
    }

    @GetMapping("/departmentCoordinator/{departmentCoordinatorID}")
    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDeparmentCoordinatorID(
            @PathVariable("departmentCoordinatorID") Long departmentCoordinatorID) {
        return preApprovalFormRequestService.getPreApprovalFormRequestsByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    @GetMapping("/departmentCoordinator/{departmentCoordinatorID}/outgoingStudent/{outgoingStudentID}")
    public List<PreApprovalFormRequest> getPreApprovalFormRequestByDepartmentCoordinatorIDAndOutgoingStudentID(
            @PathVariable("departmentCoordinatorID") Long departmentCoordinatorID,
            @PathVariable("outgoingStudentID") Long outgoingStudentID
    ) {
        return preApprovalFormRequestService.getPreApprovalFormRequestsByDepartmentCoordinatorIDAndOutgoingStudentID(departmentCoordinatorID, outgoingStudentID);
    }

    @PostMapping("/add")
    public void addPreApprovalFormRequest(@RequestBody PreApprovalFormRequest preApprovalFormRequest) {
        preApprovalFormRequestService.addPreApprovalFormRequest(preApprovalFormRequest);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePreApprovalFormRequestByID(@PathVariable("id") Long id) {
        preApprovalFormRequestService.deletePreApprovalFormRequestByID(id);
    }
}
