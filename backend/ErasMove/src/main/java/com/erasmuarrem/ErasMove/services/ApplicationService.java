package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Application;
import com.erasmuarrem.ErasMove.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }


    public List<Application> getApplications() {
        return applicationRepository.findAll();
    }

    public void addApplication(Application application) {
        Optional<Application> applicationOptional = applicationRepository.
                findByOutgoingStudentID(application.getOutgoingStudent().getID());

        if ( applicationOptional.isPresent() ) {
            throw new IllegalStateException("application for student with ID:" + application.getOutgoingStudent().getID() + " exists!");
        }

        applicationRepository.save(application);
    }

    public Application getByOutgoingStudentID(Long id) {
        Optional<Application> applicationOptional = applicationRepository.findByOutgoingStudentID(id);

        if ( !applicationOptional.isPresent() ) {
            throw new IllegalStateException("Application for student ID: " + id + " doesn't exist!");
        }

        return applicationOptional.get();
    }

    public Application getApplicationById(Long id) {
        Optional<Application> applicationOptional = applicationRepository.findById(id);

        if ( !applicationOptional.isPresent() ) {
            throw new IllegalStateException("Application with id: " + id + " doesn't exist!");
        }

        return applicationOptional.get();
    }
}
