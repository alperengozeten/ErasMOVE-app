package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Application;
import com.erasmuarrem.ErasMove.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class to manage operations related to the applications of students
 */
@RestController
@RequestMapping("/application")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    /**
     * add an application
     * @param application Application
     */
    @PostMapping("/add")
    public void addApplication(@RequestBody Application application) {
        applicationService.addApplication(application);
    }

    /**
     * returns the list of all applications
     * @return List<Application>
     */
    @GetMapping()
    public List<Application> getApplications() {
        return applicationService.getApplications();
    }

    /**
     * return an application by id
     * @param id Long
     * @return Application
     */
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable("id") Long id) {
        return applicationService.getApplicationById(id);
    }

    /**
     * this method fetches the outgoing student by id
     * @param id Long
     * @return Application
     */
    @GetMapping("/outgoingStudent/{id}")
    public Application getByOutgoingStudentID(@PathVariable("id") Long id) {
        return applicationService.getByOutgoingStudentID(id);
    }

    /**
     * returns the applications by departmentID
     * @param departmentID Long departmentID
     * @return List<Application>
     */
    @GetMapping("/departmentID/{departmentID}")
    public List<Application> getApplicationsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return applicationService.getApplicationsByDepartmentID(departmentID);
    }

    /**
     * deletes an application by id
     * @param id Long
     */
    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable("id") Long id) {
        applicationService.deleteCourse(id);
    }
}
