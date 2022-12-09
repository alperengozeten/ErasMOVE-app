package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ErasmusReplacementRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ErasmusReplacementRequestRepository extends JpaRepository<ErasmusReplacementRequest, Long> {
    Optional<ErasmusReplacementRequest> findByStudentID(Long outgoingStudentID);
    List<ErasmusReplacementRequest> findByDepartmentCoordinatorID(Long departmentCoordinatorID);
}
