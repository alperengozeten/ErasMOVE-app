package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.MobilityCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MobilityCourseRepository extends JpaRepository<MobilityCourse, Long> {
    List<MobilityCourse> findByPreApprovalFormRequestID(Long preApprovalFormRequestID);
    void deleteAllByPreApprovalFormRequest_ID(Long preApprovalFormRequestID);
}
