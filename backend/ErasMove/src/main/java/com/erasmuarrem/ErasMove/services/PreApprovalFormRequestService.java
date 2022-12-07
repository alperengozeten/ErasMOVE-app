package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.PreApprovalFormRequest;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreApprovalFormRequestService {

    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;

    @Autowired
    public PreApprovalFormRequestService(PreApprovalFormRequestRepository preApprovalFormRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository) {
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
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

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
    }

    public void deletePreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        preApprovalFormRequestRepository.deleteById(id);
    }
}
