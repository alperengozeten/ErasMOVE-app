package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Announcement;
import com.erasmuarrem.ErasMove.repositories.AnnouncementRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, DepartmentRepository departmentRepository) {
        this.announcementRepository = announcementRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.departmentRepository = departmentRepository;
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

        announcement.setAnnouncedDate(LocalDate.now()); // set the current date

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

    public List<Announcement> getAnnouncementsByDepartmentID(Long departmentID) {

        if ( !departmentRepository.existsById(departmentID) ) {
            throw new IllegalStateException("Department with id:" + departmentID + " doesn't exist!");
        }

        return announcementRepository.findByDepartmentCoordinator_Department_ID(departmentID);
    }
}
