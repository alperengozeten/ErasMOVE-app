package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.PreApprovalFormRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreApprovalFormRequestRepository extends JpaRepository<PreApprovalFormRequest, Long> {
}
