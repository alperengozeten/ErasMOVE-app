package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class to manage the operations related to the Departments of the Host University
 */
@RestController
@RequestMapping("/department")
@CrossOrigin
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    /**
     * this method fetches all departments from the database
     * @return List<Department>
     */
    @GetMapping()
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    /**
     * this method fetches
     * @param id Long
     * @return Department
     */
    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable("id") Long id) {
        return departmentService.getDepartmentById(id);
    }

    /**
     * this method fetches Department from the database with the department name
     * @param departmentName String
     * @return Department
     */
    @GetMapping("/departmentName/{departmentName}")
    public Department getDepartmentByDepartmentName(@PathVariable("departmentName") String departmentName) {
        return departmentService.getDepartmentByDepartmentName(departmentName);
    }

    /**
     * this method fetches the Department with a given course id from the database
     * @param id Long
     * @return Department
     */
    @GetMapping("/course/{id}")
    public Department getDepartmentByCourseId(@PathVariable("id") Long id) {
        return departmentService.getDepartmentByCourseId(id);
    }

    /**
     * this method adds a new Department to the database
     * @param department Department
     */
    @PostMapping("/add")
    public void addDepartment(@RequestBody Department department) {
        departmentService.addDepartment(department);
    }

    /**
     * this method adds a new course to the department
     * @param course Course
     * @param id Long
     */
    @PostMapping("/addCourse/{id}")
    public void addCourseByDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        departmentService.addCourseByDepartmentID(course, id);
    }

    /**
     * this method adds a new elective course to the deparment with the specified id
     * @param course Course
     * @param id Long
     */
    @PostMapping("/addElectiveCourse/{id}")
    public void addElectiveCourseByDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        departmentService.addElectiveCourseByDepartmentID(course, id);
    }

    /**
     * this method deletes a department with a given id
     * @param id
     */
    @DeleteMapping("/delete/{id}")
    public void deleteDepartment(@PathVariable("id") Long id) {
        departmentService.deleteDepartmentById(id);
    }

    /**
     * this method deletes a course from the department for given ids
     * @param id Long
     * @param courseID Long
     */
    @DeleteMapping("/delete/{id}/course/{courseID}")
    public void deleteCourseByDepartmentIDAndCourseID(@PathVariable("id") Long id, @PathVariable("courseID") Long courseID) {
        departmentService.deleteCourseByDepartmentIDAndCourseID(id, courseID);
    }

    /**
     * this method deletes a course with a given name from the department
     * @param id Long
     * @param courseName String
     */
    @DeleteMapping("/delete/{id}/courseName/{courseName}")
    public void deleteCourseByDepartmentIDAndCourseName(@PathVariable("id") Long id, @PathVariable("courseName") String courseName) {
        departmentService.deleteCourseByDepartmentIDAndCourseName(id, courseName);
    }

    /**
     * this method deletes an elective course with a given id from the department
     * @param id Long
     * @param electiveCourseID Long
     */
    @DeleteMapping("/delete/{id}/electiveCourse/{electiveCourseID}")
    public void deleteElectiveCourseByDepartmentIDAndCourseID(@PathVariable("id") Long id, @PathVariable("electiveCourseID") Long electiveCourseID) {
        departmentService.deleteElectiveCourseByDepartmentIDAndCourseID(id, electiveCourseID);
    }
}
