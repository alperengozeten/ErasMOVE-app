package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.MandatoryCourseApprovalRequest;
import com.erasmuarrem.ErasMove.repositories.CourseCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.MandatoryCourseApprovalRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MandatoryCourseApprovalRequestService {

    private final MandatoryCourseApprovalRequestRepository mandatoryCourseApprovalRequestRepository;
    private final CourseCoordinatorRepository courseCoordinatorRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;

    @Autowired
    public MandatoryCourseApprovalRequestService(MandatoryCourseApprovalRequestRepository mandatoryCourseApprovalRequestRepository, CourseCoordinatorRepository courseCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository) {
        this.mandatoryCourseApprovalRequestRepository = mandatoryCourseApprovalRequestRepository;
        this.courseCoordinatorRepository = courseCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
    }


    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequests() {
        return mandatoryCourseApprovalRequestRepository.findAll();
    }

    public MandatoryCourseApprovalRequest getMandatoryCourseApprovalRequestByID(Long id) {
        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Mandatory Course Approval Request with id:" + id + " doesn't exist!");
        }

        return mandatoryCourseApprovalRequestOptional.get();
    }

    public void addMandatoryCourseApprovalRequest(MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest) {
        Long courseCoordinatorID = mandatoryCourseApprovalRequest.getCourseCoordinator().getID();
        Long outgoingStudentID = mandatoryCourseApprovalRequest.getStudent().getID();

        if ( !courseCoordinatorRepository.existsById(courseCoordinatorID) ) {
            throw new IllegalStateException("Course Coordinator with id:" + courseCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        mandatoryCourseApprovalRequestRepository.save(mandatoryCourseApprovalRequest);
    }

    public void deleteMandatoryCourseApprovalRequestByID(Long id) {
        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Mandatory Course Approval Request with id:" + id + " doesn't exist!");
        }

        mandatoryCourseApprovalRequestRepository.deleteById(id);
    }

    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestByCourseCoordinatorID(Long id) {
        return mandatoryCourseApprovalRequestRepository.findByCourseCoordinatorID(id);
    }

    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestByOutgoingStudentID(Long id) {
        return mandatoryCourseApprovalRequestRepository.findByStudentID(id);
    }

    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestsByCourseCoordinatorAndOutgoingStudentID(Long courseCoordinatorID, Long outgoingStudentID) {
        if ( !courseCoordinatorRepository.existsById(courseCoordinatorID) ) {
            throw new IllegalStateException("Course Coordinator with id:" + courseCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return mandatoryCourseApprovalRequestRepository.findByCourseCoordinatorIDAndStudentID(courseCoordinatorID, outgoingStudentID);
    }
}
