package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.HostUniversity;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.HostUniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("hostUniversity")
@RestController
@CrossOrigin
public class HostUniversityController {
    private final HostUniversityService hostUniversityService;
    @Autowired
    public HostUniversityController(HostUniversityService hostUniversityService) {
        this.hostUniversityService = hostUniversityService;
    }

    @GetMapping("/{id}")
    public HostUniversity getHostUniversityById(@PathVariable("id") Long id) { return hostUniversityService.getHostUniversityById(id); }

    @GetMapping("/allAcceptedStudents")
    public List<OutgoingStudent> getAllAcceptedOutgoingStudents() {
        return hostUniversityService.getAllAcceptedOutgoingStudents();
    }

    @GetMapping("/allAcceptedStudents/departmentID/{departmentID}")
    public List<OutgoingStudent> getAllAcceptedOutgoingStudentsByDepartmentID(@PathVariable("departmentID") Long departmentID) {
        return hostUniversityService.getAllAcceptedOutgoingStudentsByDepartmentID(departmentID);
    }

    @PostMapping("/add")
    public void addHostUniversity(@RequestBody HostUniversity hostUniversity ) {
        hostUniversityService.addHostUniversity(hostUniversity);
    }

    @PostMapping("/waitingqueue/add/{id}")
    public void addStudentToTheWaitingQueue( @PathVariable("id") Long studentID) {
        hostUniversityService.addStudentToWaitingBinById(studentID);
    }

    @DeleteMapping("/waitingqueue/delete/{id}")
    public void removeStudentFromTheWaitingQueue( @PathVariable("id") Long studentID) {
        hostUniversityService.removeStudentFromWaitingBinById(studentID);
    }
}
