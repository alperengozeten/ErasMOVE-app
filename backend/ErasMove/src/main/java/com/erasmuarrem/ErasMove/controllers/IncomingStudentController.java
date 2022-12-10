package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.IncomingStudent;
import com.erasmuarrem.ErasMove.services.IncomingStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incomingStudent")
public class IncomingStudentController {
    private final IncomingStudentService incomingStudentService;
    @Autowired
    public IncomingStudentController( IncomingStudentService incomingStudentService ) {
        this.incomingStudentService = incomingStudentService;
    }
    @PostMapping("/add")
    public void addIncomingStudent(@RequestParam String adminToken,@RequestBody IncomingStudent incomingStudent ) {
        incomingStudentService.addIncomingStudent(adminToken, incomingStudent);
    }

    @DeleteMapping("delete/{id}")
    public void deleteIncomingStudent(@PathVariable("id") Long id) {
        incomingStudentService.deleteIncomingStudentById(id);
    }

    @GetMapping
    public List<IncomingStudent> getIncomingStudents() {
        return incomingStudentService.getIncomingStudents();
    }

    @GetMapping("/{id}")
    public IncomingStudent getIncomingStudentById( @PathVariable("id") Long id ) {
        return incomingStudentService.getIncomingStudentById(id);
    }

    @PostMapping("/{incomingStudentID}/preferredCourses/add/{courseID}")
    public  void addCourseToPreferredCoursesById( @PathVariable("incomingStudentID") Long id1, @PathVariable("courseID") Long id2 ) {
        incomingStudentService.addCourseToPreferredCoursesById( id1, id2);
    }

    @DeleteMapping("{incomingStudentID}/preferredCourses/delete/{courseID}")
    public void deleteCourseFromPreferredCoursesById( @PathVariable("incomingStudentID") Long id1, @PathVariable("courseID") Long id2 ) {
        incomingStudentService.deleteCourseFromPreferredCoursesById(id1,id2);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password ) {
        return incomingStudentService.login(email,password);
    }

    @PostMapping("/logout/{id}")
    public String logOut(@PathVariable("id") Long id) {
        return incomingStudentService.logOut(id);
    }

    @PatchMapping("/changePassword")
    public void changePassword( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        incomingStudentService.changePasswordByEmail(email,newPass, oldPass);
    }
}
