package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.ElectiveCourseApprovalRequest;
import com.erasmuarrem.ErasMove.services.ElectiveCourseApprovalRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/electiveCourseApprovalRequest")
public class ElectiveCourseApprovalRequestController {

    private final ElectiveCourseApprovalRequestService electiveCourseApprovalRequestService;

    @Autowired
    public ElectiveCourseApprovalRequestController(ElectiveCourseApprovalRequestService electiveCourseApprovalRequestService) {
        this.electiveCourseApprovalRequestService = electiveCourseApprovalRequestService;
    }

    @GetMapping
    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequests() {
        return electiveCourseApprovalRequestService.getElectiveCourseApprovalRequests();
    }

    @GetMapping("/{id}")
    public ElectiveCourseApprovalRequest getElectiveCourseApprovalRequestByID(@PathVariable("id") Long id) {
        return electiveCourseApprovalRequestService.getElectiveCourseApprovalRequestByID(id);
    }

    @GetMapping("/departmentCoordinator/{id}")
    public ElectiveCourseApprovalRequest getElectiveCourseApprovalRequestByDepartmentCoordinatorID(@PathVariable("id") Long id) {
        return electiveCourseApprovalRequestService.getElectiveCourseApprovalRequestByDepartmentCoordinatorID(id);
    }

    @GetMapping("/outgoingStudent/{id}")
    public ElectiveCourseApprovalRequest getElectiveCourseApprovalRequestByOutgoingStudentID(@PathVariable("id") Long id) {
        return electiveCourseApprovalRequestService.getElectiveCourseApprovalRequestByOutgoingStudentID(id);
    }

    @PostMapping("/add")
    public void addElectiveCourseApprovalRequest(@RequestBody ElectiveCourseApprovalRequest electiveCourseApprovalRequest) {
        electiveCourseApprovalRequestService.addElectiveCourseApprovalRequest(electiveCourseApprovalRequest);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteElectiveCourseApprovalRequestByID(@PathVariable("id") Long id) {
        electiveCourseApprovalRequestService.deleteElectiveCourseApprovalRequestByID(id);
    }
}
