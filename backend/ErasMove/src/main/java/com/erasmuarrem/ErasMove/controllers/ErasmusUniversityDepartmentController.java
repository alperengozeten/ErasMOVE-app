package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ErasmusUniversityDepartment;
import com.erasmuarrem.ErasMove.services.ErasmusUniversityDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/erasmusUniversityDepartment")
@CrossOrigin
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

    @GetMapping("/universityID/{universityID}/departmentName/{departmentName}")
    public ErasmusUniversityDepartment getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(@PathVariable("universityID") Long universityID,
                                                                                                            @PathVariable("departmentName") String departmentName) {
        return erasmusUniversityDepartmentService.getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(universityID, departmentName);
    }

    @GetMapping("/acceptedStudent/{acceptedStudentID}")
    public ResponseEntity<ErasmusUniversityDepartment> getErasmusUniversityDepartmentByAcceptedStudentID(@PathVariable("acceptedStudentID") Long acceptedStudentID) {
        return erasmusUniversityDepartmentService.getErasmusUniversityDepartmentByAcceptedStudentID(acceptedStudentID);
    }

    @PostMapping("/add")
    public void addErasmusUniversityDepartment(@RequestBody ErasmusUniversityDepartment erasmusUniversityDepartment) {
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(erasmusUniversityDepartment);
    }

    @PostMapping("/addCourse/{id}")
    public void addCourseByErasmusDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(course, id);
    }

    @PostMapping("/addElectiveCourse/{id}")
    public void addElectiveCourseByErasmusDepartmentID(@RequestBody Course course, @PathVariable("id") Long id) {
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID(course, id);
    }

    @PostMapping("/add/{id}/outgoingStudent/{outgoingStudentID}")
    public String addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(@PathVariable("id") Long id, @PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return erasmusUniversityDepartmentService.addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(id, outgoingStudentID);
    }

    @PatchMapping("/updateQuota/{id}")
    public String updateQuotaByErasmusUniversityDepartmentID(@PathVariable("id") Long id, @RequestParam int newQuota) {
        return erasmusUniversityDepartmentService.updateQuotaByErasmusUniversityDepartmentID(id, newQuota);
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

    @DeleteMapping("/delete/{id}/electiveCourse/{electiveCourseID}")
    public void deleteElectiveCourseByErasmusDepartmentIDAndCourseID(@PathVariable("id") Long id, @PathVariable("electiveCourseID") Long electiveCourseID) {
        erasmusUniversityDepartmentService.deleteElectiveCourseByErasmusDepartmentIDAndCourseID(id, electiveCourseID);
    }

    // add, remove course
    // add, remove student
}
