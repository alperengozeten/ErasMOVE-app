package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.models.Notification;
import com.erasmuarrem.ErasMove.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationService {
    private NotificationRepository notificationRepository;
    @Autowired
    public NotificationService(NotificationRepository notificationRepository ) {
        this.notificationRepository = notificationRepository;
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteNotificationByID(Long id) {
        Optional<Notification> notificationOptional = notificationRepository.findById(id);
        if (!notificationOptional.isPresent()) { throw  new IllegalStateException("Notification with id: "+ id + " doesn't exist!"); }
        notificationRepository.deleteById(id);
    }

    //TODO

}
