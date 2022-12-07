package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.FileRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRequestRepository extends JpaRepository<FileRequest, Long> {
}
