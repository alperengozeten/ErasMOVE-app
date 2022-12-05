package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.IncomingStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncomingStudentRepository extends JpaRepository<IncomingStudent, Long> {
    Optional<IncomingStudent> findByEmail(String email);

}
