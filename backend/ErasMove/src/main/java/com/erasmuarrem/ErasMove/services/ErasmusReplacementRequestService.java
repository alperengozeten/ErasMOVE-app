package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ErasmusReplacementRequest;
import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import com.erasmuarrem.ErasMove.models.ErasmusUniversityDepartment;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.ErasmusReplacementRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ErasmusReplacementRequestService {

    private final ErasmusReplacementRequestRepository erasmusReplacementRequestRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;

    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;

    @Autowired
    public ErasmusReplacementRequestService(ErasmusReplacementRequestRepository erasmusReplacementRequestRepository, OutgoingStudentRepository outgoingStudentRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService) {
        this.erasmusReplacementRequestRepository = erasmusReplacementRequestRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
    }

    public List<ErasmusReplacementRequest> getErasmusReplacementRequests() {
        return erasmusReplacementRequestRepository.findAll();
    }

    public ErasmusReplacementRequest getErasmusReplacementRequestByID(Long id) {
        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findById(id);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request with id:" + id + " doesn't exist!");
        }

        return erasmusReplacementRequestOptional.get();
    }

    public void addErasmusReplacementRequest(ErasmusReplacementRequest erasmusReplacementRequest) {

        Long outgoingStudentID = erasmusReplacementRequest.getStudent().getID();
        Long departmentCoordinatorID = erasmusReplacementRequest.getDepartmentCoordinator().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        // allow max of 1 active requests for a student at a time!
        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID +
                    " already has replacement request!");
        }

        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);
    }

    public void deleteErasmusReplacementRequestByID(Long id) {

        if ( !erasmusReplacementRequestRepository.existsById(id) ) {
            throw new IllegalStateException("Erasmus Replacement Request with id:" + id + " doesn't exist!");
        }

        erasmusReplacementRequestRepository.deleteById(id);
    }

    public ErasmusReplacementRequest getErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        return erasmusReplacementRequestOptional.get();
    }

    public List<ErasmusReplacementRequest> getErasmusReplacementRequestByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return erasmusReplacementRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public void acceptErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request for Outgoing Student with id:" + outgoingStudentID
            + " doesn't exist!");
        }

        ErasmusReplacementRequest erasmusReplacementRequest = erasmusReplacementRequestOptional.get();

        if ( erasmusReplacementRequest.getStatus().equals("ACCEPTED") || erasmusReplacementRequest.getStatus().equals("DECLINED") ) {
            throw new IllegalStateException("Replacement Request has already been responded!");
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get(); // get the student
        String outgoingStudentDepartmentName = outgoingStudent.getDepartment().getDepartmentName(); // get the department name
        ErasmusUniversity erasmusUniversity = erasmusReplacementRequest.getErasmusUniversity(); // get the university

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                        erasmusUniversity.getID(), outgoingStudentDepartmentName
                ); // find the department using department name and university

        erasmusUniversityDepartmentService.addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(
                erasmusUniversityDepartment.getID(),
                outgoingStudentID
        ); // add the student to the department

        erasmusReplacementRequest.setStatus("ACCEPTED"); // change the status if succesful
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);
    }

    public void declineErasmusReplacementRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository
                .findByStudentID(outgoingStudentID);

        if ( !erasmusReplacementRequestOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus Replacement Request for Outgoing Student with id:" + outgoingStudentID
                    + " doesn't exist!");
        }

        ErasmusReplacementRequest erasmusReplacementRequest = erasmusReplacementRequestOptional.get();

        erasmusReplacementRequest.setStatus("DECLINED");
        erasmusReplacementRequestRepository.save(erasmusReplacementRequest);
    }
}
