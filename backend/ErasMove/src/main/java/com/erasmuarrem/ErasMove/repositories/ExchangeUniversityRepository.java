package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ExchangeUniversity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExchangeUniversityRepository extends JpaRepository<ExchangeUniversity, Long> {
    Optional<ExchangeUniversity> findByUniversityName(String universityName);
    List<ExchangeUniversity> findByCountry(String countryName);
}
