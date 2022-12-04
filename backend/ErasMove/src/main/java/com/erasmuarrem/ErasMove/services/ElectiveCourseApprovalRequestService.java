package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ElectiveCourseApprovalRequest;
import com.erasmuarrem.ErasMove.repositories.ElectiveCourseApprovalRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ElectiveCourseApprovalRequestService {

    private final ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository;

    @Autowired
    public ElectiveCourseApprovalRequestService(ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository) {
        this.electiveCourseApprovalRequestRepository = electiveCourseApprovalRequestRepository;
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequests() {
        return electiveCourseApprovalRequestRepository.findAll();
    }

    public ElectiveCourseApprovalRequest getElectiveCourseApprovalRequestByID(Long id) {
        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course Approval Request with id:" + id + " doesn't exist!");
        }

        return electiveCourseApprovalRequestOptional.get();
    }

    public void addElectiveCourseApprovalRequest(ElectiveCourseApprovalRequest electiveCourseApprovalRequest) {
        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
    }
}
