package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.CourseCoordinator;
import com.erasmuarrem.ErasMove.services.CourseCoordinatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class that manages the operations related to the course coordinator
 */
@RestController
@RequestMapping("/courseCoordinator")
@CrossOrigin
public class CourseCoordinatorController {

    private final CourseCoordinatorService courseCoordinatorService;

    @Autowired
    public CourseCoordinatorController(CourseCoordinatorService courseCoordinatorService) {
        this.courseCoordinatorService = courseCoordinatorService;
    }

    /**
     * returns the list of all course coordinators
     * @return List<CourseCoordinator>
     */
    @GetMapping()
    public List<CourseCoordinator> getCourseCoordinators() {
        return courseCoordinatorService.getCourseCoordinators();
    }

    /**
     * fetches the course coordinator with the given id from the database
     * @param id Long
     * @return CourseCoordinator
     */
    @GetMapping("/{id}")
    public CourseCoordinator getCourseCoordinatorByID(@PathVariable("id") Long id) {
        return courseCoordinatorService.getCourseCoordinatorByID(id);
    }

    /**
     * fetches the CourseCoordinator from the database for a given courseID
     * @param id Long
     * @return CourseCoordinator
     */
    @GetMapping("/course/{id}")
    public CourseCoordinator getCourseCoordinatorByCourseID(@PathVariable("id") Long id) {
        return courseCoordinatorService.getCourseCoordinatorByCourseID(id);
    }

    /**
     * fetches all the course coordinators from the database with the specified departmentID
     * @param departmentID Long
     * @return List<CourseCoordinator>
     */
    @GetMapping("/department/{departmentID}")
    public List<CourseCoordinator> getCourseCoordinatorsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return courseCoordinatorService.getCourseCoordinatorsByDepartmentID(departmentID);
    }

    /**
     * adds a new CourseCoordinator object to the database
     * @param courseCoordinator CourseCoordinator
     */
    @PostMapping("/add")
    public void addCourseCoordinator(@RequestBody CourseCoordinator courseCoordinator) {
        courseCoordinatorService.addCourseCoordinator(courseCoordinator);
    }

    /**
     * deletes a course coordinator from the database with a given id
     * @param id
     */
    @DeleteMapping("/delete/{id}")
    public void deleteCourseCoordinatorByID(@PathVariable("id") Long id) {
        courseCoordinatorService.deleteCourseCoordinatorByID(id);
    }
}
