package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import com.erasmuarrem.ErasMove.repositories.CourseProposalRepository;
import com.erasmuarrem.ErasMove.repositories.IncomingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseProposalService {

    private final CourseProposalRepository courseProposalRepository;
    private final AdministrativeStaffService administrativeStaffService;
    private final AdministrativeStaffRepository administrativeStaffRepository;
    private final IncomingStudentRepository incomingStudentRepository;
    private final NotificationService notificationService;

    @Autowired
    public CourseProposalService(CourseProposalRepository courseProposalRepository, AdministrativeStaffService administrativeStaffService, AdministrativeStaffRepository administrativeStaffRepository, IncomingStudentRepository incomingStudentRepository, NotificationService notificationService) {
        this.courseProposalRepository = courseProposalRepository;
        this.administrativeStaffService = administrativeStaffService;
        this.administrativeStaffRepository = administrativeStaffRepository;
        this.incomingStudentRepository = incomingStudentRepository;
        this.notificationService = notificationService;
    }

    public List<CourseProposal> getCourseProposals() {
        return courseProposalRepository.findAll();
    }

    public CourseProposal getCourseProposalByCourseProposalID(Long courseProposalID) {
        Optional<CourseProposal> courseProposalOptional = courseProposalRepository.findById(courseProposalID);

        if ( !courseProposalOptional.isPresent() ) {
            throw new IllegalStateException("Course Proposal with id:" + courseProposalID + " doesn't exist!");
        }

        return courseProposalOptional.get();
    }

    public ResponseEntity<String> deleteCourseProposalByCourseProposalID(Long courseProposalID) {
        Optional<CourseProposal> courseProposalOptional = courseProposalRepository.findById(courseProposalID);

        if ( !courseProposalOptional.isPresent() ) {
            return new ResponseEntity<>("Course Proposal with id:" + courseProposalID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        courseProposalRepository.deleteById(courseProposalID);
        return new ResponseEntity<>("Course Proposal with id:" + courseProposalID + " has been deleted!", HttpStatus.OK);
    }

    public ResponseEntity<String> addCourseProposal(CourseProposal courseProposal) {

        Long incomingStudentID = courseProposal.getIncomingStudent().getID();
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById(incomingStudentID);

        if ( !incomingStudentOptional.isPresent() ) {
            return new ResponseEntity<>("Incoming Student with id:" + incomingStudentID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        IncomingStudent incomingStudent = incomingStudentOptional.get();

        AdministrativeStaff administrativeStaff = administrativeStaffService
                .getAdministrativeStaffByDepartmentId(incomingStudent.getDepartment().getID());

        if ( administrativeStaff == null ) {
            return new ResponseEntity<>("Administrative Staff for Department:" + incomingStudent.getDepartment().getDepartmentName() + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        List<CourseProposal> courseProposalList = courseProposalRepository.findByIncomingStudent_ID(incomingStudentID);

        for (CourseProposal courseProposal1: courseProposalList) {
            if ( courseProposal1.getStatus().equals("WAITING") ) {
                return new ResponseEntity<>("The Incoming Student with id:" + incomingStudent.getID() + " already has a waiting proposal!", HttpStatus.BAD_REQUEST);
            }
            else if ( courseProposal1.getStatus().equals("ACCEPTED") ) {
                return new ResponseEntity<>("The Incoming Student with id:" + incomingStudent.getID() + " already has an accepted proposal!", HttpStatus.BAD_REQUEST);
            }
        }

        // send notification to the administrative staff
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(administrativeStaff);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new course proposal by Incoming Student: " +
                incomingStudent.getName() + " waiting for your response!");

        notificationService.saveNotification(newNotification); // save the notification

        incomingStudent.setCourseProposalStatus("Course Proposal Is Waiting For The Response");
        courseProposal.setAdministrativeStaff(administrativeStaff);
        courseProposal.setStatus("WAITING");
        courseProposalRepository.save(courseProposal);
        incomingStudentRepository.save(incomingStudent);
        return new ResponseEntity<>("Course Proposal has been sent!", HttpStatus.OK);
    }

    public List<CourseProposal> getCourseProposalsByAdministrativeStaffID(Long administrativeStaffID) {

        if ( !administrativeStaffRepository.existsById(administrativeStaffID) ) {
            throw new IllegalStateException("Administrative Staff with id:" + administrativeStaffID + " doesn't exist!");
        }

        return courseProposalRepository.findByAdministrativeStaff_ID(administrativeStaffID);
    }

    public List<CourseProposal> getCourseProposalsByIncomingStudentID(Long incomingStudentID) {

        if ( !incomingStudentRepository.existsById(incomingStudentID) ) {
            throw new IllegalStateException("Incoming Student with id:" + incomingStudentID + " doesn't exist!");
        }

        return courseProposalRepository.findByIncomingStudent_ID(incomingStudentID);
    }

    public ResponseEntity<String> declineCourseProposalByCourseProposalID(Long courseProposalID) {

        Optional<CourseProposal> courseProposalOptional = courseProposalRepository.findById(courseProposalID);

        if ( !courseProposalOptional.isPresent() ) {
            return new ResponseEntity<>("Course Proposal with id:" + courseProposalID + " doesn't exist!", HttpStatus.OK);
        }

        CourseProposal courseProposal = courseProposalOptional.get();
        IncomingStudent incomingStudent = courseProposal.getIncomingStudent();

        if ( courseProposal.getStatus().equals("ACCEPTED") || courseProposal.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Course Proposal with id:" + courseProposalID + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // send notification to the incoming student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(incomingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Course Proposal has been declined by the Administrative Staff: " +
                incomingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        incomingStudent.setCourseProposalStatus("Course Proposal Declined");
        courseProposal.setStatus("DECLINED");
        courseProposalRepository.save(courseProposal);
        incomingStudentRepository.save(incomingStudent);
        return new ResponseEntity<>("Course Proposal has been declined!", HttpStatus.OK);
    }

    public ResponseEntity<String> acceptCourseProposalByCourseProposalID(Long courseProposalID) {

        Optional<CourseProposal> courseProposalOptional = courseProposalRepository.findById(courseProposalID);

        if ( !courseProposalOptional.isPresent() ) {
            return new ResponseEntity<>("Course Proposal with id:" + courseProposalID + " doesn't exist!", HttpStatus.OK);
        }

        CourseProposal courseProposal = courseProposalOptional.get();
        IncomingStudent incomingStudent = courseProposal.getIncomingStudent();

        if ( courseProposal.getStatus().equals("ACCEPTED") || courseProposal.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Course Proposal with id:" + courseProposalID + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // send notification to the incoming student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(incomingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Course Proposal has been accepted by the Administrative Staff: " +
                incomingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        List<Course> preferredCourses = new ArrayList<>(courseProposal.getPlannedCourses());
        incomingStudent.setPreferredCourses(preferredCourses);

        incomingStudent.setCourseProposalStatus("Course Proposal Accepted");
        courseProposal.setStatus("ACCEPTED");
        courseProposalRepository.save(courseProposal);
        incomingStudentRepository.save(incomingStudent);
        return new ResponseEntity<>("Course Proposal has been accepted!", HttpStatus.OK);
    }
}
