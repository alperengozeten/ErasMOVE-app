package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.MandatoryCourseApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MandatoryCourseApprovalRequestRepository extends JpaRepository<MandatoryCourseApprovalRequest, Long> {
    List<MandatoryCourseApprovalRequest> findByCourseCoordinatorID(Long courseCoordinatorID);
    List<MandatoryCourseApprovalRequest> findByStudentID(Long outgoingStudentID);

    List<MandatoryCourseApprovalRequest> findByCourseCoordinatorIDAndStudentID(Long courseCoordinatorID, Long outgoingStudentID);
}
