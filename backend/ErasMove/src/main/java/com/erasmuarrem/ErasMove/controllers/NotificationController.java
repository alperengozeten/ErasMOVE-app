package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Notification;
import com.erasmuarrem.ErasMove.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    private NotificationService notificationService;
    @Autowired
    public NotificationController( NotificationService notificationService ) {
        this.notificationService = notificationService;
    }
    @PostMapping("/send")
    public void sendNotification(@RequestBody Notification notification) {
        notificationService.saveNotification(notification);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable("id") long id) {
        notificationService.deleteNotificationByID(id);
    }

}
