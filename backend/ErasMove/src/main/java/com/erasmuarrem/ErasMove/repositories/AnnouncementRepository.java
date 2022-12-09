package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByDepartmentCoordinatorID(Long deparmentCoordinatorID);
}
