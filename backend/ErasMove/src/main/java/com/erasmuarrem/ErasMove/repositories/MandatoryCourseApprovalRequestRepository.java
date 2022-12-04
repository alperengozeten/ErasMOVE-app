package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.MandatoryCourseApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MandatoryCourseApprovalRequestRepository extends JpaRepository<MandatoryCourseApprovalRequest, Long> {
}
