package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.CourseCoordinator;
import com.erasmuarrem.ErasMove.services.CourseCoordinatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courseCoordinator")
@CrossOrigin
public class CourseCoordinatorController {

    private final CourseCoordinatorService courseCoordinatorService;

    @Autowired
    public CourseCoordinatorController(CourseCoordinatorService courseCoordinatorService) {
        this.courseCoordinatorService = courseCoordinatorService;
    }

    @GetMapping()
    public List<CourseCoordinator> getCourseCoordinators() {
        return courseCoordinatorService.getCourseCoordinators();
    }

    @GetMapping("/{id}")
    public CourseCoordinator getCourseCoordinatorByID(@PathVariable("id") Long id) {
        return courseCoordinatorService.getCourseCoordinatorByID(id);
    }

    @GetMapping("/course/{id}")
    public CourseCoordinator getCourseCoordinatorByCourseID(@PathVariable("id") Long id) {
        return courseCoordinatorService.getCourseCoordinatorByCourseID(id);
    }

    @PostMapping("/add")
    public void addCourseCoordinator(@RequestBody CourseCoordinator courseCoordinator) {
        courseCoordinatorService.addCourseCoordinator(courseCoordinator);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCourseCoordinatorByID(@PathVariable("id") Long id) {
        courseCoordinatorService.deleteCourseCoordinatorByID(id);
    }
}
