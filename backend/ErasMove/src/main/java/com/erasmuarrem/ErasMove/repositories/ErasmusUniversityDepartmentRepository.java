package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ErasmusUniversityDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ErasmusUniversityDepartmentRepository extends JpaRepository<ErasmusUniversityDepartment, Long> {
    Optional<ErasmusUniversityDepartment> findByErasmusUniversityIDAndDepartmentName(Long erasmusUniversityID, String departmentName);
    List<ErasmusUniversityDepartment> findByDepartmentName(String departmentName);
    List<ErasmusUniversityDepartment> findByErasmusUniversity_ID(Long erasmusUniversityID);
}
