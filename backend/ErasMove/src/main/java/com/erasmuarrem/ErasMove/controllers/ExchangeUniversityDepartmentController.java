package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ExchangeUniversityDepartment;
import com.erasmuarrem.ErasMove.services.ExchangeUniversityDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exchangeUniversityDepartment")
public class ExchangeUniversityDepartmentController {

    private final ExchangeUniversityDepartmentService exchangeUniversityDepartmentService;

    @Autowired
    public ExchangeUniversityDepartmentController(ExchangeUniversityDepartmentService exchangeUniversityDepartmentService) {
        this.exchangeUniversityDepartmentService = exchangeUniversityDepartmentService;
    }

    @GetMapping
    public List<ExchangeUniversityDepartment> getExchangeUniversityDepartments() {
        return exchangeUniversityDepartmentService.getExchangeUniversityDepartments();
    }

    @GetMapping("/{id}")
    public ExchangeUniversityDepartment getExchangeUniversityDepartmentByID(@PathVariable("id") Long id) {
        return exchangeUniversityDepartmentService.getExchangeUniversityDepartmentByID(id);
    }

    @PostMapping("/add")
    public void addExchangeUniversityDepartment(@RequestBody ExchangeUniversityDepartment exchangeUniversityDepartment) {
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(exchangeUniversityDepartment);
    }

    @PostMapping("/addCourse/{id}")
    public void addCourseByExchangeDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(course, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExchangeUniversityDepartmentByID(@PathVariable("id") Long id) {
        exchangeUniversityDepartmentService.deleteExchangeUniversityDepartmentByID(id);
    }

    @DeleteMapping("/delete/{id}/course/{courseID}")
    public void deleteCourseByExchangeDepartmentIDAndCourseID(@PathVariable("id") Long id, @PathVariable("courseID") Long courseID) {
        exchangeUniversityDepartmentService.deleteCourseByExchangeDepartmentIDAndCourseID(id, courseID);
    }

    @DeleteMapping("/delete/{id}/courseName/{courseName}")
    public void deleteCourseByExchangeDepartmentIDAndCourseName(@PathVariable("id") Long id, @PathVariable("courseName") String courseName) {
        exchangeUniversityDepartmentService.deleteCourseByExchangeDepartmentIDAndCourseName(id, courseName);
    }
}
