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
    public void addOutgoingStudent(@RequestParam String adminToken,@RequestBody OutgoingStudent outgoingStudent) {
        outgoingStudentService.addOutgoingStudent(adminToken,outgoingStudent);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password ) {
        return outgoingStudentService.login(email,password);
    }

    @PostMapping("/logout/{id}")
    public String logOut(@PathVariable("id") Long id) {
        return outgoingStudentService.logOut(id);
    }

    @PatchMapping("/changePassword")
    public void changePassword( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        outgoingStudentService.changePasswordByEmail(email,newPass, oldPass);
    }

}
