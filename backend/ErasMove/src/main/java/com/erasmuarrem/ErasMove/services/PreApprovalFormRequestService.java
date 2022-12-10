package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.PreApprovalFormRequest;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreApprovalFormRequestService {

    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;

    private final OutgoingStudentRepository outgoingStudentRepository;

    @Autowired
    public PreApprovalFormRequestService(PreApprovalFormRequestRepository preApprovalFormRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository) {
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequests() {
        return preApprovalFormRequestRepository.findAll();
    }

    public PreApprovalFormRequest getPreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        return preApprovalFormRequestOptional.get();
    }

    public void addPreApprovalFormRequest(PreApprovalFormRequest preApprovalFormRequest) {
        Long departmentCoordinatorID = preApprovalFormRequest.getDepartmentCoordinator().getID();
        Long outgoingStudentID = preApprovalFormRequest.getStudent().getID();

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);

        // the student shouldn't have a waiting or accepted request
        for(PreApprovalFormRequest approvalFormRequest: preApprovalFormRequests) {
            if ( approvalFormRequest.getStatus().equals("ACCEPTED") ) {
                throw new IllegalStateException("Student with id:" + outgoingStudentID + " already has an accepted Pre-Approval Form!");
            }
            else if ( approvalFormRequest.getStatus().equals("WAITING") ) {
                throw new IllegalStateException("Student with id:" + outgoingStudentID + " already has a waiting Pre-Approval Form!");
            }
        }

        preApprovalFormRequest.setStatus("WAITING");
        preApprovalFormRequestRepository.save(preApprovalFormRequest);
    }

    public void deletePreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        preApprovalFormRequestRepository.deleteById(id);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentCoordinatorIDAndOutgoingStudentID(Long departmentCoordinatorID, Long outgoingStudentID) {
        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByDepartmentCoordinatorIDAndStudentID(departmentCoordinatorID, outgoingStudentID);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);
    }

    public void declinePreApprovalFormRequest(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form with id:" + id + " doesn't exist!");
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("DECLINED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
    }

    public void acceptPreApprovalFormRequestByID(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form with id:" + id + " doesn't exist!");
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("ACCEPTED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
    }
}
