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
    private final NotificationService notificationService;
    @Autowired
    public NotificationController( NotificationService notificationService ) {
        this.notificationService = notificationService;
    }
    @PostMapping("/add")
    public void sendNotification(@RequestBody Notification notification) {
        notificationService.saveNotification(notification);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable("id") Long id) {
        notificationService.deleteNotificationByID(id);
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable("id") Long id ) {
        return notificationService.getNotificationById(id);
    }
}
