package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentCoordinatorRepository extends JpaRepository<DepartmentCoordinator, Long> {
    Optional<DepartmentCoordinator> findByDepartmentID(Long departmentID);

    Optional<DepartmentCoordinator> findByEmail(String email);
}
