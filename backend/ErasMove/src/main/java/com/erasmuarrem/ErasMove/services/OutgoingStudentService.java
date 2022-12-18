package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OutgoingStudentService {

    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;
    private final ExchangeUniversityService exchangeUniversityService;
    private final PreApprovalFormRequestService preApprovalFormRequestService;
    private final ApplicationService applicationService;
    private final ProposalService proposalService;

    @Autowired
    public OutgoingStudentService(OutgoingStudentRepository outgoingStudentRepository, ErasmusUniversityService erasmusUniversityService, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, ExchangeUniversityService exchangeUniversityService, PreApprovalFormRequestService preApprovalFormRequestService, ApplicationService applicationService, ProposalService proposalService) {
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.erasmusUniversityService = erasmusUniversityService;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.exchangeUniversityService = exchangeUniversityService;
        this.preApprovalFormRequestService = preApprovalFormRequestService;
        this.applicationService = applicationService;
        this.proposalService = proposalService;
    }

    public List<OutgoingStudent> getStudents() {
        return outgoingStudentRepository.findAll();
    }

    public Optional<OutgoingStudent> getStudentByID(Long id) {
        return outgoingStudentRepository.findById(id);
    }

    public void addOutgoingStudent(OutgoingStudent outgoingStudent) {
        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findByEmail(outgoingStudent.getEmail());

        if ( outgoingStudentOptional.isPresent() ) {
            throw new IllegalStateException("student exists!");
        }

        outgoingStudentRepository.save(outgoingStudent);
    }

    public String cancelPlacementByOutgoingStudentID(Long outgoingStudentID) {
        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(outgoingStudentID);

        if ( !outgoingStudentOptional.isPresent() ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        OutgoingStudent outgoingStudent = outgoingStudentOptional.get();

        Application application = applicationService.getByOutgoingStudentID(outgoingStudentID);

        if ( application == null ) {
            return "The Outgoing Student with id:" + outgoingStudentID + " doesn't currently have an application!";
        }

        application.setAdmittedStatus("CANCELLED");

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!";
            }

            ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                    .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                            erasmusUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            erasmusUniversityDepartmentService.deleteOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(
                    erasmusUniversityDepartment.getID(), outgoingStudentID
            );

            // refresh proposals
            proposalService.makeErasmusProposalsToDepartmentCoordinator(outgoingStudent.getDepartment().getID());
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!";
            }

            exchangeUniversityService.deleteOutgoingStudentByIDAndOutgoingStudentID(
                    exchangeUniversity.getID(), outgoingStudentID
            );

            // refresh proposals
            proposalService.makeExchangeProposalsToDepartmentCoordinators();
        }

        // delete the Pre-Approval forms of the student!
        String output = preApprovalFormRequestService.deletePreApprovalFormRequestByOutgoingStudentID(outgoingStudentID);
        return output + "\nPlacement of the Outgoing Student with id:" + outgoingStudentID + " has been cancelled!";
    }

    public ResponseEntity<ContractedUniversity> getAcceptedUniversityByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService
                    .getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(erasmusUniversity, HttpStatus.OK);
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService
                    .getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(exchangeUniversity, HttpStatus.OK);
        }
    }
}
