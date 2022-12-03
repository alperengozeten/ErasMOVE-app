package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    Optional<Announcement> findByDepartmentCoordinatorID(Long deparmentCoordinatorID);
}
