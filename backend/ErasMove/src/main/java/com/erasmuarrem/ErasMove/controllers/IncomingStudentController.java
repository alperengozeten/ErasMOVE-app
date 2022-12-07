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
    public void addIncomingStudent(@RequestBody IncomingStudent incomingStudent ) {
        incomingStudentService.addIncomingStudent(incomingStudent);
    }

    @DeleteMapping("delete/{id}")
    public void deleteIncomingStudent(@PathVariable("id") Long id) {
        incomingStudentService.deleteIncomingStudentById(id);
    }

    @GetMapping()
    public List<IncomingStudent> getIncomingStudents() {
        return incomingStudentService.getIncomingStudents();
    }

    @GetMapping("/{id}")
    public IncomingStudent getIncomingStudentById( @PathVariable("id") Long id ) {
        return incomingStudentService.getIncomingStudentById(id);
    }

    @PostMapping("/{id1}/preferredCourses/add/{id2}")
    public  void addCourseToPreferredCoursesById( @PathVariable("id1") Long id1, @PathVariable("id2") Long id2 ) {
        incomingStudentService.addCourseToPreferredCoursesById( id1, id2);
    }

    @DeleteMapping("{id1}/preferredCourses/delete/{id2}")
    public void deleteCourseFromPreferredCoursesById( @PathVariable("id1") Long id1, @PathVariable("id2") Long id2 ) {
        incomingStudentService.deleteCourseFromPreferredCoursesById(id1,id2);
    }
}
