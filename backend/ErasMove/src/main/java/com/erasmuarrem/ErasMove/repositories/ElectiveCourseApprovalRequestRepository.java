package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ElectiveCourseApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ElectiveCourseApprovalRequestRepository extends JpaRepository<ElectiveCourseApprovalRequest, Long> {
    Optional<ElectiveCourseApprovalRequest> findByDepartmentCoordinatorID(Long departmentCoordinatorID);
    Optional<ElectiveCourseApprovalRequest> findByStudentID(Long studentID);
}
