package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

     List<Notification> findAllByReceiverID(Long id);
    //TODO
}
