package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ExchangeUniversityDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExchangeUniversityDepartmentRepository extends JpaRepository<ExchangeUniversityDepartment, Long> {
    Optional<ExchangeUniversityDepartment> findByExchangeUniversityIDAndDepartmentName(Long exchangeUniversityID, String departmentName);
    List<ExchangeUniversityDepartment> findByExchangeUniversity_ID(Long exchangeUniversityID);
}
