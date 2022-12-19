package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.PreApprovalFormRequest;
import com.erasmuarrem.ErasMove.models.ResponseMessage;
import com.erasmuarrem.ErasMove.services.PreApprovalFormRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Controller class for PreApprovalFormRequest,
 * specifying end points and related functions
 */
@RestController
@RequestMapping("/preApprovalForm")
@CrossOrigin
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

    @GetMapping("/outgoingStudent/{outgoingStudentID}")
    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByOutgoingStudentID(@PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return preApprovalFormRequestService.getPreApprovalFormRequestsByOutgoingStudentID(outgoingStudentID);
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

    @GetMapping("/department/{departmentID}")
    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return preApprovalFormRequestService.getPreApprovalFormRequestsByDepartmentID(departmentID);
    }

    @GetMapping("/pdf/{id}")
    public ResponseEntity<Resource> getPDFPreApprovalFormByID(@PathVariable("id") Long id) {
        return preApprovalFormRequestService.getPDFPreApprovalFormByID(id);
    }

    @PostMapping("/add") // the student must be admitted to be able to call this!
    public ResponseEntity<ResponseMessage> addPreApprovalFormRequestBy(@RequestBody PreApprovalFormRequest preApprovalFormRequest) {
        return preApprovalFormRequestService.addPreApprovalFormRequest(preApprovalFormRequest);
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<String> acceptPreApprovalFormRequestByID(@PathVariable("id") Long id, @RequestParam String feedback) {
        return preApprovalFormRequestService.acceptPreApprovalFormRequestByID(id, feedback);
    }

    @PostMapping("/decline/{id}")
    public ResponseEntity<String> declinePreApprovalFormRequest(@PathVariable("id") Long id, @RequestParam String feedback) {
        return preApprovalFormRequestService.declinePreApprovalFormRequest(id, feedback);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePreApprovalFormRequestByID(@PathVariable("id") Long id) {
        preApprovalFormRequestService.deletePreApprovalFormRequestByID(id);
    }

    @DeleteMapping("/delete/outgoingStudent/{outgoingStudentID}")
    public String deletePreApprovalFormRequestsByOutgoingStudentID(@PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return preApprovalFormRequestService.deletePreApprovalFormRequestByOutgoingStudentID(outgoingStudentID);
    }
}
