package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping()
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable("id") Long id) {
        return departmentService.getDepartmentById(id);
    }

    @GetMapping("/departmentName/{departmentName}")
    public Department getDepartmentByDeparmentName(@PathVariable("departmentName") String departmentName) {
        return departmentService.getDepartmentByDepartmentName(departmentName);
    }

    @GetMapping("/course/{id}")
    public Department getDepartmentByCourseId(@PathVariable("id") Long id) {
        return departmentService.getDepartmentByCourseId(id);
    }

    @PostMapping("/add")
    public void addDepartment(@RequestBody Department department) {
        departmentService.addDepartment(department);
    }

    @PostMapping("/addCourse/{id}")
    public void addCourseByDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        departmentService.addCourseByDepartmentID(course, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDepartment(@PathVariable("id") Long id) {
        departmentService.deleteDepartmentById(id);
    }

    @DeleteMapping("/delete/{id}/course/{courseID}")
    public void deleteCourseByDepartmentIDAndCourseID(@PathVariable("id") Long id, @PathVariable("courseID") Long courseID) {
        departmentService.deleteCourseByDepartmentIDAndCourseID(id, courseID);
    }

    @DeleteMapping("/delete/{id}/courseName/{courseName}")
    public void deleteCourseByDepartmentIDAndCourseName(@PathVariable("id") Long id, @PathVariable("courseName") String courseName) {
        departmentService.deleteCourseByDepartmentIDAndCourseName(id, courseName);
    }
}
