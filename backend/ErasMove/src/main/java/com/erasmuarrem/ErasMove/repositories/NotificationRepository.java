package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    public void deleteById(Long id);

    //TODO
}
