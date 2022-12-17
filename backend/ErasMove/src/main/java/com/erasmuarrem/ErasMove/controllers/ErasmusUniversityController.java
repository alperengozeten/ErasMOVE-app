package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import com.erasmuarrem.ErasMove.models.Language;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.ErasmusUniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/erasmusUniversity")
@CrossOrigin
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

    @GetMapping("/acceptedStudent/{acceptedStudentID}")
    public ErasmusUniversity getErasmusUniversityByAcceptedStudentID(@PathVariable("acceptedStudentID") Long acceptedStudentID) {
        return erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(acceptedStudentID);
    }

    @GetMapping("/allAccepted/departmentID/{departmentID}")
    public List<OutgoingStudent> getAllAcceptedOutgoingStudentsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return erasmusUniversityService.getAllAcceptedOutgoingStudentsByDepartmentID(departmentID);
    }

    @GetMapping("/allAccepted")
    public List<OutgoingStudent> getAllAcceptedOutgoingStudents() {
        return erasmusUniversityService.getAllAcceptedOutgoingStudents();
    }

    @GetMapping("/nonEmptyQuota/{departmentName}")
    public List<ErasmusUniversity> getErasmusUniversitiesWithNonEmptyDepartmentQuotaByDepartmentName(@PathVariable("departmentName") String departmentName) {
        return erasmusUniversityService.getErasmusUniversitiesWithNonEmptyDepartmentQuotaByDepartmentName(departmentName);
    }

    @PostMapping("/rejectedCourses/{id}")
    public void addRejectedCourseByID(@RequestBody Course course, @PathVariable("id") Long erasmusUniversityID) {
        erasmusUniversityService.addRejectedCourse(course, erasmusUniversityID);
    }

    @PostMapping("/add")
    public void addErasmusUniversity(@RequestBody ErasmusUniversity erasmusUniversity) {
        erasmusUniversityService.addErasmusUniversity(erasmusUniversity);
    }

    @PostMapping("/addLanguageRequirement/erasmusUniversity/{erasmusUniversityID}")
    public ResponseEntity<String> addLanguageRequirementToErasmusUniversityByErasmusUniversityID(
            @PathVariable("erasmusUniversityID") Long erasmusUniversityID,
            @RequestBody Language language) {
        return erasmusUniversityService.addLanguageRequirementToErasmusUniversityByErasmusUniversityID(erasmusUniversityID, language);
    }

    @PatchMapping("/editDetails/{id}")
    public String editDetailsByErasmusUniversityID(@PathVariable("id") Long id, @RequestParam String universityName,
                                                   @RequestParam String country) {
        return erasmusUniversityService.editDetailsByErasmusUniversityID(id, universityName, country);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteErasmusUniversityByID(@PathVariable("id") Long id) {
        erasmusUniversityService.deleteErasmusUniversityByID(id);
    }

    @DeleteMapping("/delete/{id}/rejectedCourses/{courseID}")
    public void deleteRejectedCourseByIDAndCourseID(@PathVariable("id") Long id, @PathVariable("courseID") Long courseID) {
        erasmusUniversityService.deleteRejectedCourseByIDAndCourseID(id, courseID);
    }
}
