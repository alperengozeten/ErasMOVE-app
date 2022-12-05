package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.HostUniversity;
import com.erasmuarrem.ErasMove.services.HostUniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("hostUniversity")
@RestController
public class HostUniversityController {
    private final HostUniversityService hostUniversityService;
    @Autowired
    public HostUniversityController(HostUniversityService hostUniversityService) {
        this.hostUniversityService = hostUniversityService;
    }

    @GetMapping("/{id}")
    public HostUniversity getHostUniversityById(@PathVariable("id") Long id) { return hostUniversityService.getHostUniversityById(id); }

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
