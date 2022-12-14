package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Application;
import com.erasmuarrem.ErasMove.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/application")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/add")
    public void addApplication(@RequestBody Application application) {
        applicationService.addApplication(application);
    }

    @GetMapping()
    public List<Application> getApplications() {
        return applicationService.getApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable("id") Long id) {
        return applicationService.getApplicationById(id);
    }

    @GetMapping("/outgoingStudent/{id}")
    public Application getByOutgoingStudentID(@PathVariable("id") Long id) {
        return applicationService.getByOutgoingStudentID(id);
    }

    @GetMapping("/departmentID/{departmentID}")
    public List<Application> getApplicationsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return applicationService.getApplicationsByDepartmentID(departmentID);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable("id") Long id) {
        applicationService.deleteCourse(id);
    }
}
