package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Announcement;
import com.erasmuarrem.ErasMove.repositories.AnnouncementRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository) {
        this.announcementRepository = announcementRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
    }

    public List<Announcement> getAnnouncements() {
        return announcementRepository.findAll();
    }

    public Announcement getAnnouncementById(Long id) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);

        if ( !announcementOptional.isPresent() ) {
            throw new IllegalStateException("Announcement with id:" + id + " doesn't exist!");
        }

        return announcementOptional.get();
    }

    public void addAnnouncement(Announcement announcement) {
        Long departmentCoordinatorID = announcement.getDepartmentCoordinator().getID();

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" +  departmentCoordinatorID + " doesn't exist!");
        }

        announcementRepository.save(announcement);
    }

    public List<Announcement> getAnnouncementByDepartmentCoordinatorId(Long id) {

        if ( !departmentCoordinatorRepository.existsById(id) ) {
            throw new IllegalStateException("Department Coordinator id:" + id + " doesn't exist!");
        }

        return announcementRepository.findByDepartmentCoordinatorID(id);
    }

    public void deleteAnnouncementById(Long id) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);

        if ( !announcementOptional.isPresent() ) {
            throw new IllegalStateException("Announcement with id:" + id + " doesn't exist!");
        }

        announcementRepository.deleteById(id);
    }
}
