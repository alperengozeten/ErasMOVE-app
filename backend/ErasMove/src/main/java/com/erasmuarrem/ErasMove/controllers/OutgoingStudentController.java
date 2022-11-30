package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.services.OutgoingStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/outgoingStudent")
public class OutgoingStudentController {

    private final OutgoingStudentService outgoingStudentService;

    @Autowired
    public OutgoingStudentController(OutgoingStudentService outgoingStudentService) {
        this.outgoingStudentService = outgoingStudentService;
    }

    @GetMapping
    public String hello() {
        return outgoingStudentService.helloService();
    }
}
