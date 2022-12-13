package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
}
