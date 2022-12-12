package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ExchangeUniversity;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.ExchangeUniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exchangeUniversity")
public class ExchangeUniversityController {

    private final ExchangeUniversityService exchangeUniversityService;

    @Autowired
    public ExchangeUniversityController(ExchangeUniversityService exchangeUniversityService) {
        this.exchangeUniversityService = exchangeUniversityService;
    }

    @GetMapping
    public List<ExchangeUniversity> getExchangeUniversities() {
        return exchangeUniversityService.getExchangeUniversities();
    }

    @GetMapping("/{id}")
    public ExchangeUniversity getExchangeUniversityByID(@PathVariable("id") Long id) {
        return exchangeUniversityService.getExchangeUniversityByID(id);
    }

    @GetMapping("/name/{name}")
    public ExchangeUniversity getExchangeUniversityByName(@PathVariable("name") String universityName) {
        return exchangeUniversityService.getExchangeUniversityByName(universityName);
    }

    @GetMapping("/country/{name}")
    public List<ExchangeUniversity> getExchangeUniversitiesByCountryName(@PathVariable("name") String countryName) {
        return exchangeUniversityService.getExchangeUniversitiesByCountryName(countryName);
    }

    @GetMapping("/acceptedStudent/{acceptedStudentID}")
    public ExchangeUniversity getExchangeUniversityByAcceptedStudentID(@PathVariable("acceptedStudentID") Long acceptedStudentID) {
        return exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(acceptedStudentID);
    }

    @GetMapping("/allAccepted/departmentID/{departmentID}")
    public List<OutgoingStudent> getAllAcceptedOutgoingStudentsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return exchangeUniversityService.getAllAcceptedOutgoingStudentsByDepartmentID(departmentID);
    }

    @GetMapping("/allAccepted")
    public List<OutgoingStudent> getAllAcceptedOutgoingStudents() {
        return exchangeUniversityService.getAllAcceptedOutgoingStudents();
    }

    @PostMapping("/rejectedCourses/{id}")
    public void addRejectedCourseByID(@RequestBody Course course, @PathVariable("id") Long exchangeUniversityID) {
        exchangeUniversityService.addRejectedCourseByID(course, exchangeUniversityID);
    }

    @PostMapping("/add")
    public void addExchangeUniversity(@RequestBody ExchangeUniversity exchangeUniversity) {
        exchangeUniversityService.addExchangeUniversity(exchangeUniversity);
    }

    @PostMapping("/add/{id}/outgoingStudent/{outgoingStudentID}")
    public String addOutgoingStudentByIDAndOutgoingStudentID(@PathVariable("id") Long id, @PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return exchangeUniversityService.addOutgoingStudentByIDAndOutgoingStudentID(id, outgoingStudentID);
    }

    @PatchMapping("/editDetails/{id}")
    public String editExchangeUniversityDetailsByID(@PathVariable("id") Long id, @RequestParam String universityName,
                                                    @RequestParam String country, @RequestParam int quota) {
        return exchangeUniversityService.editExchangeUniversityDetailsByID(id, universityName, country, quota);
    }

    @DeleteMapping("/{id}")
    public void deleteExchangeUniversityByID(@PathVariable("id") Long id) {
        exchangeUniversityService.deleteExchangeUniversityByID(id);
    }

    @DeleteMapping("delete/{id}/rejectedCourses/{courseID}")
    public void deleteExchangeUniversityByIDAndCourseID(@PathVariable("id") Long id, @PathVariable("courseID") Long courseID) {
        exchangeUniversityService.deleteRejectedCourseByIDAndCourseID(id, courseID);
    }

    @DeleteMapping("/delete/{id}/outgoingStudent/{outgoingStudentID}")
    public void deleteOutgoingStudentByIDAndOutgoingStudentID(@PathVariable("id") Long id, @PathVariable("outgoingStudentID") Long outgoingStudentID) {
        exchangeUniversityService.deleteOutgoingStudentByIDAndOutgoingStudentID(id, outgoingStudentID);
    }
}
