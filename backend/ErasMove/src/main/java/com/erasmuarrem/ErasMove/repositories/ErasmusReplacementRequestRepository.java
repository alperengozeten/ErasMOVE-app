package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ErasmusReplacementRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErasmusReplacementRequestRepository extends JpaRepository<ErasmusReplacementRequest, Long> {
    List<ErasmusReplacementRequest> findByStudentID(Long outgoingStudentID);
    List<ErasmusReplacementRequest> findByDepartmentCoordinatorID(Long departmentCoordinatorID);
    List<ErasmusReplacementRequest> findByStatusAndDepartmentCoordinator_ID(String status, Long departmentCoordinatorID);
    void deleteAllByStatusAndDepartmentCoordinator_ID(String status, Long departmentCoordinatorID);
}
