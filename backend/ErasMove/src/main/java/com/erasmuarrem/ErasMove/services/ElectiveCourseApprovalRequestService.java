package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ElectiveCourseApprovalRequest;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.ElectiveCourseApprovalRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ElectiveCourseApprovalRequestService {

    private final ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;

    @Autowired
    public ElectiveCourseApprovalRequestService(ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository) {
        this.electiveCourseApprovalRequestRepository = electiveCourseApprovalRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
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

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
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

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequestsByDepartmentCoordinatorAndOutgoingStudentID(Long departmentCoordinatorID, Long outgoingStudentID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return electiveCourseApprovalRequestRepository.findByDepartmentCoordinatorIDAndStudentID(departmentCoordinatorID, outgoingStudentID);
    }
}
