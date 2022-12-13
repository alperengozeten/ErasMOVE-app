package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.MandatoryCourseApprovalRequest;
import com.erasmuarrem.ErasMove.services.MandatoryCourseApprovalRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mandatoryCourseApprovalRequest")
@CrossOrigin
public class MandatoryCourseApprovalRequestController {

    private final MandatoryCourseApprovalRequestService mandatoryCourseApprovalRequestService;

    @Autowired
    public MandatoryCourseApprovalRequestController(MandatoryCourseApprovalRequestService mandatoryCourseApprovalRequestService) {
        this.mandatoryCourseApprovalRequestService = mandatoryCourseApprovalRequestService;
    }

    @GetMapping
    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequests() {
        return mandatoryCourseApprovalRequestService.getMandatoryCourseApprovalRequests();
    }

    @GetMapping("/{id}")
    public MandatoryCourseApprovalRequest getMandatoryCourseApprovalRequestByID(@PathVariable("id") Long id) {
        return mandatoryCourseApprovalRequestService.getMandatoryCourseApprovalRequestByID(id);
    }

    @GetMapping("/courseCoordinator/{id}")
    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestByCourseCoordinatorID(@PathVariable("id") Long id) {
        return mandatoryCourseApprovalRequestService.getMandatoryCourseApprovalRequestByCourseCoordinatorID(id);
    }

    @GetMapping("/outgoingStudent/{id}")
    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestByOutgoingStudentID(@PathVariable("id") Long id) {
        return mandatoryCourseApprovalRequestService.getMandatoryCourseApprovalRequestByOutgoingStudentID(id);
    }

    @GetMapping("/courseCoordinator/{id1}/outgoingStudent/{id2}")
    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestsByCourseCoordinatorAndOutgoingStudentID(
            @PathVariable("id1") Long courseCoordinatorID,
            @PathVariable("id2") Long outgoingStudentID
    ) {
        return mandatoryCourseApprovalRequestService.getMandatoryCourseApprovalRequestsByCourseCoordinatorAndOutgoingStudentID(
                courseCoordinatorID,
                outgoingStudentID
        );
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMandatoryCourseApprovalRequest(@RequestBody MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest) {
        return mandatoryCourseApprovalRequestService.addMandatoryCourseApprovalRequest(mandatoryCourseApprovalRequest);
    }

    @PostMapping("/decline/{id}")
    public ResponseEntity<String> declineMandatoryCourseApprovalRequestByID(@PathVariable("id") Long id, @RequestParam String feedback) {
        return mandatoryCourseApprovalRequestService.declineMandatoryCourseApprovalRequestByID(id, feedback);
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<String> acceptMandatoryCourseApprovalRequestByID(@PathVariable("id") Long id, @RequestParam String feedback) {
        return mandatoryCourseApprovalRequestService.acceptMandatoryCourseApprovalRequestByID(id, feedback);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMandatoryCourseApprovalRequestByID(@PathVariable("id") Long id) {
        mandatoryCourseApprovalRequestService.deleteMandatoryCourseApprovalRequestByID(id);
    }
}
