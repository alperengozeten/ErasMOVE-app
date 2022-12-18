package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ExchangeReplacementRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeReplacementRequestRepository extends JpaRepository<ExchangeReplacementRequest, Long> {
    List<ExchangeReplacementRequest> findByStudentID(Long outgoingStudentID);
    List<ExchangeReplacementRequest> findByDepartmentCoordinatorID(Long departmentCoordinatorID);
    List<ExchangeReplacementRequest> findByStatusAndDepartmentCoordinator_ID(String status, Long departmentCoordinatorID);
    void deleteAllByStatus(String status);
}
