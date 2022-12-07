package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.FileRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRequestRepository extends JpaRepository<FileRequest, Long> {
    List<FileRequest> findByAdministrativeStaffID(Long administrativeStaffID);
    List<FileRequest> findByStudentID(Long outgoingStudentID);
    List<FileRequest> findByAdministrativeStaffIDAndStudentID(Long administrativeStaffID, Long studentID);
}
