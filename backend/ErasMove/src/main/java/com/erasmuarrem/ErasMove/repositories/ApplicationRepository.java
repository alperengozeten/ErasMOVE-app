package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findByOutgoingStudentID(Long id);
    List<Application> findByOutgoingStudent_DepartmentID(Long departmentID);
    List<Application> findByOutgoingStudent_Department_departmentName(String departmentName);
    List<Application> findByOutgoingStudent_IsErasmusAndOutgoingStudent_Department_ID(Boolean isErasmus, Long departmentID);
    List<Application> findByOutgoingStudent_IsErasmus(Boolean isErasmus);
}
