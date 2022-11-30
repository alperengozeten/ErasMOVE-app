package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutgoingStudentRepository extends JpaRepository<OutgoingStudent, Long> {
}
