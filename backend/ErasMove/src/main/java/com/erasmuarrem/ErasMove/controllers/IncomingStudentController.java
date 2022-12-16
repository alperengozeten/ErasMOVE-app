package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.CourseProposal;
import com.erasmuarrem.ErasMove.models.IncomingStudent;
import com.erasmuarrem.ErasMove.services.CourseProposalService;
import com.erasmuarrem.ErasMove.services.IncomingStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incomingStudent")
@CrossOrigin
public class IncomingStudentController {
    private final IncomingStudentService incomingStudentService;
    private final CourseProposalService courseProposalService;

    @Autowired
    public IncomingStudentController(IncomingStudentService incomingStudentService, CourseProposalService courseProposalService) {
        this.incomingStudentService = incomingStudentService;
        this.courseProposalService = courseProposalService;
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
    @PostMapping("/add")
    public void addIncomingStudent(@RequestBody IncomingStudent incomingStudent ) {
        incomingStudentService.addIncomingStudent(incomingStudent);
    }

    @PostMapping("/{incomingStudentID}/preferredCourses/add/{courseID}")
    public  void addCourseToPreferredCoursesById( @PathVariable("incomingStudentID") Long id1, @PathVariable("courseID") Long id2 ) {
        incomingStudentService.addCourseToPreferredCoursesById( id1, id2);
    }

    @DeleteMapping("{incomingStudentID}/preferredCourses/delete/{courseID}")
    public void deleteCourseFromPreferredCoursesById( @PathVariable("incomingStudentID") Long id1, @PathVariable("courseID") Long id2 ) {
        incomingStudentService.deleteCourseFromPreferredCoursesById(id1,id2);
    }


    // COURSE PROPOSALS

    @GetMapping("/courseProposal")
    public List<CourseProposal> getCourseProposals() {
        return courseProposalService.getCourseProposals();
    }

    @GetMapping("/courseProposal/{id}")
    public CourseProposal getCourseProposalByCourseProposalID(@PathVariable("id") Long courseProposalID) {
        return courseProposalService.getCourseProposalByCourseProposalID(courseProposalID);
    }

    @GetMapping("/courseProposal/incomingStudent/{incomingStudentID}")
    public List<CourseProposal> getCourseProposalsByIncomingStudentID(@PathVariable("incomingStudentID") Long incomingStudentID) {
        return courseProposalService.getCourseProposalsByIncomingStudentID(incomingStudentID);
    }

    @GetMapping("/courseProposal/administrativeStaff/{administrativeStaffID}")
    public List<CourseProposal> getCourseProposalsByAdministrativeStaffID(@PathVariable("administrativeStaffID") Long administrativeStaffID) {
        return courseProposalService.getCourseProposalsByAdministrativeStaffID(administrativeStaffID);
    }

    @PostMapping("/addCourseProposal")
    public ResponseEntity<String> addCourseProposal(@RequestBody CourseProposal courseProposal) {
        return courseProposalService.addCourseProposal(courseProposal);
    }

    @PostMapping("/declineProposal/{id}")
    public ResponseEntity<String> declineCourseProposalByCourseProposalID(@PathVariable("id") Long courseProposalID) {
        return courseProposalService.declineCourseProposalByCourseProposalID(courseProposalID);
    }

    @PostMapping("/acceptProposal/{id}")
    public ResponseEntity<String> acceptCourseProposalByCourseProposalID(@PathVariable("id") Long courseProposalID) {
        return courseProposalService.acceptCourseProposalByCourseProposalID(courseProposalID);
    }

    @DeleteMapping("/courseProposal/delete/{id}")
    public ResponseEntity<String> deleteCourseProposalByCourseProposalID(@PathVariable("id") Long courseProposalID) {
        return courseProposalService.deleteCourseProposalByCourseProposalID(courseProposalID);
    }
}
