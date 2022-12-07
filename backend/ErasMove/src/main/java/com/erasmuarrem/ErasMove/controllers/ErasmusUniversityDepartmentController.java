package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ErasmusUniversityDepartment;
import com.erasmuarrem.ErasMove.services.ErasmusUniversityDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/erasmusUniversityDepartment")
public class ErasmusUniversityDepartmentController {

    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;

    @Autowired
    public ErasmusUniversityDepartmentController(ErasmusUniversityDepartmentService erasmusUniversityDepartmentService) {
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
    }

    @GetMapping()
    public List<ErasmusUniversityDepartment> getErasmusUniversityDepartments() {
        return erasmusUniversityDepartmentService.getErasmusUniversityDepartments();
    }

    @GetMapping("/{id}")
    public ErasmusUniversityDepartment getErasmusUniversityDepartmentByID(@PathVariable("id") Long id) {
        return erasmusUniversityDepartmentService.getErasmusUniversityDepartmentByID(id);
    }

    @PostMapping("/add")
    public void addErasmusUniversityDepartment(@RequestBody ErasmusUniversityDepartment erasmusUniversityDepartment) {
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(erasmusUniversityDepartment);
    }

    @PostMapping("/addCourse/{id}")
    public void addCourseByErasmusDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(course, id);
    }

    @PostMapping("/add/{id}/outgoingStudent/{outgoingStudentID}")
    public void addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(@PathVariable("id") Long id, @PathVariable("outgoingStudentID") Long outgoingStudentID) {
        erasmusUniversityDepartmentService.addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(id, outgoingStudentID);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteErasmusUniversityDepartmentByID(@PathVariable("id") Long id) {
        erasmusUniversityDepartmentService.deleteErasmusUniversityDepartmentByID(id);
    }

    @DeleteMapping("/delete/{id}/course/{courseID}")
    public void deleteCourseByErasmusDepartmentIDAndCourseID(@PathVariable("id") Long id, @PathVariable("courseID") Long courseID) {
        erasmusUniversityDepartmentService.deleteCourseByErasmusDepartmentIDAndCourseID(id, courseID);
    }

    @DeleteMapping("/delete/{id}/outgoingStudent/{outgoingStudentID}")
    public void deleteOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(@PathVariable("id") Long id, @PathVariable("outgoingStudentID") Long outgoingStudentID) {
        erasmusUniversityDepartmentService.deleteOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(id, outgoingStudentID);
    }

    // add, remove course
    // add, remove student
}
