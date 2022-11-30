package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.OutgoingStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentService.getStudentByID(id);

        return outgoingStudentOptional.get();
    }

    @PostMapping("/add")
    public void addOutgoingStudent(OutgoingStudent outgoingStudent) {
        outgoingStudentService.addOutgoingStudent(outgoingStudent);
    }

}
