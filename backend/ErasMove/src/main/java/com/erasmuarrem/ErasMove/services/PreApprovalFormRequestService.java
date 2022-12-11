package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import com.erasmuarrem.ErasMove.models.ExchangeUniversity;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.models.PreApprovalFormRequest;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreApprovalFormRequestService {

    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;

    private final OutgoingStudentRepository outgoingStudentRepository;
    private final OutgoingStudentService outgoingStudentService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ExchangeUniversityService exchangeUniversityService;

    @Autowired
    public PreApprovalFormRequestService(PreApprovalFormRequestRepository preApprovalFormRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository, OutgoingStudentService outgoingStudentService, ErasmusUniversityService erasmusUniversityService, ExchangeUniversityService exchangeUniversityService) {
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.outgoingStudentService = outgoingStudentService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.exchangeUniversityService = exchangeUniversityService;
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

    public String addPreApprovalFormRequest(PreApprovalFormRequest preApprovalFormRequest) {
        Long departmentCoordinatorID = preApprovalFormRequest.getDepartmentCoordinator().getID();
        Long outgoingStudentID = preApprovalFormRequest.getStudent().getID();

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            return "Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!";
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        OutgoingStudent outgoingStudent = outgoingStudentService.getStudentByID(outgoingStudentID).get();

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!";
            }
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!";
            }
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);

        // the student shouldn't have a waiting or accepted request
        for (PreApprovalFormRequest approvalFormRequest: preApprovalFormRequests) {
            if ( approvalFormRequest.getStatus().equals("ACCEPTED") ) {
                return "Student with id:" + outgoingStudentID + " already has an accepted Pre-Approval Form!";
            }
            else if ( approvalFormRequest.getStatus().equals("WAITING") ) {
                return "Student with id:" + outgoingStudentID + " already has a waiting Pre-Approval Form!";
            }
        }

        preApprovalFormRequest.setStatus("WAITING");
        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return "Pre-Approval Form is submitted!";
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

    public String declinePreApprovalFormRequest(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return "Pre-Approval Form with id:" + id + " doesn't exist!";
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        if ( preApprovalFormRequest.getStatus().equals("ACCEPTED") || preApprovalFormRequest.getStatus().equals("DECLINED") ) {
            return "Pre-Approval Form with id:" + id + " has already been responded!";
        }

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("DECLINED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return "Pre-Approval Form with id:" + id + " has been declined!";
    }

    public String acceptPreApprovalFormRequestByID(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return "Pre-Approval Form with id:" + id + " doesn't exist!";
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        if ( preApprovalFormRequest.getStatus().equals("ACCEPTED") || preApprovalFormRequest.getStatus().equals("DECLINED") ) {
            return "Pre-Approval Form with id:" + id + " has already been responded!";
        }

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("ACCEPTED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return "Pre-Approval Form with id:" + id + " has been accepted!";
    }

    @Transactional
    public String deletePreApprovalFormRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = getPreApprovalFormRequestsByOutgoingStudentID(
                outgoingStudentID
        );

        if ( preApprovalFormRequests.size() == 0 ) {
            return "Outgoing Student has not yet created a Pre-Approval Form!";
        }

        preApprovalFormRequestRepository.deletePreApprovalFormRequestsByStudent_ID(outgoingStudentID);
        return "All Pre-Approval Forms of Outgoing Student with id:" + outgoingStudentID + " have been deleted!";
    }
}
