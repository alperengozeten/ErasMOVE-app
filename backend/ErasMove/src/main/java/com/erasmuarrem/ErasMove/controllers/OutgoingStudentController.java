package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.OutgoingStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/outgoingStudent")
public class OutgoingStudentController {

    private final OutgoingStudentService outgoingStudentService;

    @Autowired
    public OutgoingStudentController(OutgoingStudentService outgoingStudentService) {
        this.outgoingStudentService = outgoingStudentService;
    }

    @GetMapping
    public List<OutgoingStudent> getStudents() {
        return outgoingStudentService.getStudents();
    }

    @GetMapping("/{id}")
    public OutgoingStudent getStudent(@PathVariable("id") Long id) {
        return outgoingStudentService.getStudentByID(id).orElse(null);
    }

    @PostMapping("/add")
    public void addOutgoingStudent(@RequestBody OutgoingStudent outgoingStudent) {
        outgoingStudentService.addOutgoingStudent(outgoingStudent);
    }
}
