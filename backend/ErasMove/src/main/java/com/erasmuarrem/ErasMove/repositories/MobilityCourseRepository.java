package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.MobilityCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MobilityCourseRepository extends JpaRepository<MobilityCourse, Long> {
    Optional<MobilityCourse> findByPreApprovalFormRequestID(Long preApprovalFormRequestID);
}
