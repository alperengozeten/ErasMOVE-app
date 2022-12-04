package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ElectiveCourseApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectiveCourseApprovalRequestRepository extends JpaRepository<ElectiveCourseApprovalRequest, Long> {
}
