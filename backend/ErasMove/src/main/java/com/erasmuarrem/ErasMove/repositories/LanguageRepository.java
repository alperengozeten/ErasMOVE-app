package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    Optional<Language> findByOutgoingStudentIDAndLanguage(Long outgoingStudentID, String language);
    List<Language> findByOutgoingStudentID(Long outgoingStudentID);
}
