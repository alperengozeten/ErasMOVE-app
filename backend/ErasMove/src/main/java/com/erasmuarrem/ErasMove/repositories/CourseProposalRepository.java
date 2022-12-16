package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.CourseProposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseProposalRepository extends JpaRepository<CourseProposal, Long> {
    List<CourseProposal> findByIncomingStudent_ID(Long incomingStudentID);
    List<CourseProposal> findByAdministrativeStaff_ID(Long administrativeStaffID);
}
