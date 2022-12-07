package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
     Optional<Admin> findByEmail(String email);
}
