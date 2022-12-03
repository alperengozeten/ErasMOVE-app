package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Announcement;
import com.erasmuarrem.ErasMove.repositories.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
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
        announcementRepository.save(announcement);
    }

    public Announcement getAnnouncementByDepartmentCoordinatorId(Long id) {
        Optional<Announcement> announcementOptional = announcementRepository.findByDepartmentCoordinatorID(id);

        if ( !announcementOptional.isPresent() ) {
            throw new IllegalStateException("Announcement with Department Coordinator id:" + id + " doesn't exist!");
        }

        return announcementOptional.get();
    }

    public void deleteAnnouncementById(Long id) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);

        if ( !announcementOptional.isPresent() ) {
            throw new IllegalStateException("Announcement with id:" + id + " doesn't exist!");
        }

        announcementRepository.deleteById(id);
    }
}
