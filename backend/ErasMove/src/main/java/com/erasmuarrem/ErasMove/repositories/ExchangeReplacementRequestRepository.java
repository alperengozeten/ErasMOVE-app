package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ExchangeReplacementRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExchangeReplacementRequestRepository extends JpaRepository<ExchangeReplacementRequest, Long> {
    Optional<ExchangeReplacementRequest> findByStudentID(Long outgoingStudentID);
    List<ExchangeReplacementRequest> findByDepartmentCoordinatorID(Long departmentCoordinatorID);
}
