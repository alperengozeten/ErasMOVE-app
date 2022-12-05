package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ErasmusUniversityRepository extends JpaRepository<ErasmusUniversity, Long> {
    Optional<ErasmusUniversity> findByUniversityName(String universityName);
    List<ErasmusUniversity> findByCountry(String countryName);
}
