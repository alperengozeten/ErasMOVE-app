package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Announcement;
import com.erasmuarrem.ErasMove.services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Announcement controller for managing operations for announcements
 */
@RestController
@RequestMapping("/announcement")
@CrossOrigin
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping()
    public List<Announcement> getAnnouncements() {
        return announcementService.getAnnouncements();
    }

    @GetMapping("/{id}")
    public Announcement getAnnouncementById(@PathVariable("id") Long id) {
        return announcementService.getAnnouncementById(id);
    }

    /**
     * get announcements by departmentCoordinatorID
     * @param id Long
     * @return List<Announcement>
     */
    @GetMapping("/departmentCoordinator/{id}")
    public List<Announcement> getAnnouncementByDepartmentCoordinatorId(@PathVariable("id") Long id) {
        return announcementService.getAnnouncementByDepartmentCoordinatorId(id);
    }

    /**
     * get announcements by department id
     * @param departmentID Long
     * @return List<Announcement>
     */
    @GetMapping("/department/{departmentID}")
    public List<Announcement> getAnnouncementsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return announcementService.getAnnouncementsByDepartmentID(departmentID);
    }

    /**
     * method to add announcement to save to database
     * @param announcement Announcement
     */
    @PostMapping("/add")
    public void addAnnouncement(@RequestBody Announcement announcement) {
        announcementService.addAnnouncement(announcement);
    }

    /**
     * method to delete the announcement by id
     * @param id Long
     */
    @DeleteMapping("/delete/{id}")
    public void deleteAnnouncementById(@PathVariable("id") Long id) {
        announcementService.deleteAnnouncementById(id);
    }
}
