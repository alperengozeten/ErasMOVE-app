package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OutgoingStudentRepository extends JpaRepository<OutgoingStudent, Long> {
    Optional<OutgoingStudent> findByEmail(String email);
}
