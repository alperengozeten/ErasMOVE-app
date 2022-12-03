package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByDepartmentName(String departmentName);
    Optional<Department> findByCourseList_ID(Long courseId);
}
