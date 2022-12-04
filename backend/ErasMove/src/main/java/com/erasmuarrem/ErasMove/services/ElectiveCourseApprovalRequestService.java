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
        Long departmentCoordinatorID = electiveCourseApprovalRequest.getDepartmentCoordinator().getID();
        Long outgoingStudentID = electiveCourseApprovalRequest.getStudent().getID();

        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findByDepartmentCoordinatorIDAndStudentID(
                        departmentCoordinatorID,
                        outgoingStudentID
                );

        if ( electiveCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course Approval Request already exists for this pair of outgoing student and" +
                    " department coordinator!");
        }

        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequestByDepartmentCoordinatorID(Long id) {
        return electiveCourseApprovalRequestRepository.findByDepartmentCoordinatorID(id);
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequestByOutgoingStudentID(Long id) {
        return electiveCourseApprovalRequestRepository.findByStudentID(id);
    }

    public void deleteElectiveCourseApprovalRequestByID(Long id) {
        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course Approval Request with id:" + id + " doesn't exist!");
        }

        electiveCourseApprovalRequestRepository.deleteById(id);
    }

    public ElectiveCourseApprovalRequest getElectiveCourseApprovalRequestByDepartmentCoordinatorAndOutgoingStudentID(Long departmentCoordinatorID, Long outgoingStudentID) {
        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findByDepartmentCoordinatorIDAndStudentID(
                        departmentCoordinatorID,
                        outgoingStudentID
                );

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course Approval Request for this pair of outgoing student-department coordinator doesn't exist!");
        }

        return electiveCourseApprovalRequestOptional.get();
    }
}
