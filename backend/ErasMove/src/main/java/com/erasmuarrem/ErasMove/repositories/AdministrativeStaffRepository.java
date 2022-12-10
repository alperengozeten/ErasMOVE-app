package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministrativeStaffRepository extends JpaRepository<AdministrativeStaff, Long> {
    Optional<AdministrativeStaff> findByDepartments_ID(Long departmentID);
    Optional<AdministrativeStaff> findByDepartments_DepartmentName(String departmentName);
    Optional<AdministrativeStaff> findByEmail(String email);

}
