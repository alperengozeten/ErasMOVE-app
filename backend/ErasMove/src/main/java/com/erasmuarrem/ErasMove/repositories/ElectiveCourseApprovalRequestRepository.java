package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ElectiveCourseApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElectiveCourseApprovalRequestRepository extends JpaRepository<ElectiveCourseApprovalRequest, Long> {
    List<ElectiveCourseApprovalRequest> findByDepartmentCoordinatorID(Long departmentCoordinatorID);
    List<ElectiveCourseApprovalRequest> findByStudentID(Long studentID);

    List<ElectiveCourseApprovalRequest> findByDepartmentCoordinatorIDAndStudentID(Long departmentCoordinatorID, Long outgoingStudentID);
}
