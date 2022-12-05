package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import com.erasmuarrem.ErasMove.services.ErasmusUniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/erasmusUniversity")
public class ErasmusUniversityController {

    private final ErasmusUniversityService erasmusUniversityService;

    @Autowired
    public ErasmusUniversityController(ErasmusUniversityService erasmusUniversityService) {
        this.erasmusUniversityService = erasmusUniversityService;
    }

    @GetMapping()
    public List<ErasmusUniversity> getErasmusUniversities() {
        return erasmusUniversityService.getErasmusUniversities();
    }

    @GetMapping("/{id}")
    public ErasmusUniversity getErasmusUniversityByID(@PathVariable("id") Long id) {
        return erasmusUniversityService.getErasmusUniversityByID(id);
    }

    @GetMapping("/name/{name}")
    public ErasmusUniversity getErasmusUniversityByName(@PathVariable("name") String universityName) {
        return erasmusUniversityService.getErasmusUniversityByName(universityName);
    }

    @GetMapping("/country/{name}")
    public List<ErasmusUniversity> getErasmusUniversitiesByCountryName(@PathVariable("name") String countryName) {
        return erasmusUniversityService.getErasmusUniversitiesByCountryName(countryName);
    }

    @PostMapping("/rejectedCourses/{id}")
    public void addRejectedCourseByID(@RequestBody Course course, @PathVariable("id") Long erasmusUniversityID) {
        erasmusUniversityService.addRejectedCourse(course, erasmusUniversityID);
    }

    @PostMapping("/add")
    public void addErasmusUniversity(@RequestBody ErasmusUniversity erasmusUniversity) {
        erasmusUniversityService.addErasmusUniversity(erasmusUniversity);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteErasmusUniversityByID(@PathVariable("id") Long id) {
        erasmusUniversityService.deleteErasmusUniversityByID(id);
    }
}
