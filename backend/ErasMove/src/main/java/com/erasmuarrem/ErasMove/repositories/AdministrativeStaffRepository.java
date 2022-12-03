package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministrativeStaffRepository extends JpaRepository<AdministrativeStaff, Long> {
    //Optional<AdministrativeStaff> findByDepartments(Department department);
}
