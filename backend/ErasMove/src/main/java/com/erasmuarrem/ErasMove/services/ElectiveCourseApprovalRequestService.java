package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ElectiveCourseApprovalRequestService {

    private final ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final OutgoingStudentService outgoingStudentService;
    private final DepartmentCoordinatorService departmentCoordinatorService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ErasmusUniversityRepository erasmusUniversityRepository;
    private final ExchangeUniversityService exchangeUniversityService;
    private final ExchangeUniversityRepository exchangeUniversityRepository;
    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;
    private final ExchangeUniversityDepartmentService exchangeUniversityDepartmentService;
    private final CourseRepository courseRepository;
    private final NotificationService notificationService;

    @Autowired
    public ElectiveCourseApprovalRequestService(ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository, OutgoingStudentService outgoingStudentService, DepartmentCoordinatorService departmentCoordinatorService, ErasmusUniversityService erasmusUniversityService, ErasmusUniversityRepository erasmusUniversityRepository, ExchangeUniversityService exchangeUniversityService, ExchangeUniversityRepository exchangeUniversityRepository, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, ExchangeUniversityDepartmentService exchangeUniversityDepartmentService, CourseRepository courseRepository, NotificationService notificationService) {
        this.electiveCourseApprovalRequestRepository = electiveCourseApprovalRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.outgoingStudentService = outgoingStudentService;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.erasmusUniversityRepository = erasmusUniversityRepository;
        this.exchangeUniversityService = exchangeUniversityService;
        this.exchangeUniversityRepository = exchangeUniversityRepository;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.exchangeUniversityDepartmentService = exchangeUniversityDepartmentService;
        this.courseRepository = courseRepository;
        this.notificationService = notificationService;
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequests() {
        return electiveCourseApprovalRequestRepository.findAll();
    }

    public ElectiveCourseApprovalRequest getElectiveCourseApprovalRequestByID(Long id) {
        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course Approval Request with id:" + id + " doesn't exist!");
        }

        return electiveCourseApprovalRequestOptional.get();
    }

    public ResponseEntity<ResponseMessage> addElectiveCourseApprovalRequest(ElectiveCourseApprovalRequest electiveCourseApprovalRequest) {
        Long outgoingStudentID = electiveCourseApprovalRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        // get the student and the department coordinator
        // since they are not automatically pulled, because the request isn't pulled from the database
        OutgoingStudent outgoingStudent = outgoingStudentService.getStudentByID(outgoingStudentID).get();

        // search for a department coordinator to respond
        DepartmentCoordinator departmentCoordinator = departmentCoordinatorService.getDepartmentCoordinatorByDepartmentId(outgoingStudent.getDepartment().getID());

        // if there is no coordinator to respond
        if ( departmentCoordinator == null ) {
            return new ResponseEntity<>(new ResponseMessage("There is no Department Coordinator for department:" + outgoingStudent.getDepartment().getDepartmentName() + " to respond!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", (long) -1), HttpStatus.BAD_REQUEST);
            }

            List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

            for (Course rejectedCourse: rejectedCourses) {
                if ( rejectedCourse.getCourseName().equals(electiveCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Elective Course with name:" + electiveCourseApprovalRequest.getCourseName() + " has already been rejected!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }

            // get the related department!
            ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                    .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                            erasmusUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            List<Course> acceptedCourses = erasmusUniversityDepartment.getElectiveCourseList();

            for (Course acceptedCourse: acceptedCourses) {
                if ( acceptedCourse.getCourseName().equals(electiveCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Elective Course with name:" + electiveCourseApprovalRequest.getCourseName() + " has already been accepted!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", (long) -1), HttpStatus.BAD_REQUEST);
            }

            List<Course> rejectedCourses = exchangeUniversity.getRejectedCourses();

            for (Course rejectedCourse: rejectedCourses) {
                if ( rejectedCourse.getCourseName().equals(electiveCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Elective Course with name:" + electiveCourseApprovalRequest.getCourseName() + " has already been rejected!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }

            ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentService
                    .getExchangeUniversityDepartmentByExchangeUniversityIDAndDepartmentName(
                            exchangeUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            List<Course> acceptedCourses = exchangeUniversityDepartment.getElectiveCourseList();

            for (Course acceptedCourse: acceptedCourses) {
                if ( acceptedCourse.getCourseName().equals(electiveCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Elective Course with name:" + electiveCourseApprovalRequest.getCourseName() + " has already been accepted!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }
        }

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("You have a new Elective Course Approval Request by Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        electiveCourseApprovalRequest.setDepartmentCoordinator(departmentCoordinator);
        electiveCourseApprovalRequest.setStatus("WAITING"); // set status before saving
        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
        return new ResponseEntity<>(new ResponseMessage("Elective Course Request has been sent!", electiveCourseApprovalRequest.getID()), HttpStatus.OK);
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequestByDepartmentCoordinatorID(Long id) {
        return electiveCourseApprovalRequestRepository.findByDepartmentCoordinatorID(id);
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequestByOutgoingStudentID(Long id) {
        return electiveCourseApprovalRequestRepository.findByStudentID(id);
    }

    public void deleteElectiveCourseApprovalRequestByID(Long id) {
        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course Approval Request with id:" + id + " doesn't exist!");
        }

        electiveCourseApprovalRequestRepository.deleteById(id);
    }

    public List<ElectiveCourseApprovalRequest> getElectiveCourseApprovalRequestsByDepartmentCoordinatorAndOutgoingStudentID(Long departmentCoordinatorID, Long outgoingStudentID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return electiveCourseApprovalRequestRepository.findByDepartmentCoordinatorIDAndStudentID(departmentCoordinatorID, outgoingStudentID);
    }

    public ResponseEntity<String> declineElectiveCourseApprovalRequestByID(Long id, String feedback) {

        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Elective Course Approval Request with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        ElectiveCourseApprovalRequest electiveCourseApprovalRequest = electiveCourseApprovalRequestOptional.get();
        OutgoingStudent outgoingStudent = electiveCourseApprovalRequest.getStudent();
        Long outgoingStudentID = outgoingStudent.getID();

        if ( electiveCourseApprovalRequest.getStatus().equals("ACCEPTED") || electiveCourseApprovalRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Elective Course Approval Request has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // add the course to the list of rejected courses!
        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", HttpStatus.BAD_REQUEST);
            }

            List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

            Course newRejectedCourse = new Course();
            newRejectedCourse.setCourseName(electiveCourseApprovalRequest.getCourseName());
            newRejectedCourse.setDescription(electiveCourseApprovalRequest.getDescription());
            newRejectedCourse.setEcts(electiveCourseApprovalRequest.getEcts()); // set the attributes

            courseRepository.save(newRejectedCourse); // save the course

            rejectedCourses.add(newRejectedCourse); // add the course to the list

            erasmusUniversityRepository.save(erasmusUniversity); // save the university back
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", HttpStatus.BAD_REQUEST);
            }

            List<Course> rejectedCourses = exchangeUniversity.getRejectedCourses();

            Course newRejectedCourse = new Course();
            newRejectedCourse.setCourseName(electiveCourseApprovalRequest.getCourseName());
            newRejectedCourse.setDescription(electiveCourseApprovalRequest.getDescription());
            newRejectedCourse.setEcts(electiveCourseApprovalRequest.getEcts()); // set the attributes

            courseRepository.save(newRejectedCourse); // save the course

            rejectedCourses.add(newRejectedCourse); // add the course to the list

            exchangeUniversityRepository.save(exchangeUniversity); // save the university back
        }

        DepartmentCoordinator departmentCoordinator = electiveCourseApprovalRequest.getDepartmentCoordinator();

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Elective Course Approval Request has been rejected by the Department Coordinator: " +
                departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        electiveCourseApprovalRequest.setStatus("DECLINED");
        electiveCourseApprovalRequest.setFeedback(feedback); // add this to the rejected courses!!

        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
        return new ResponseEntity<>("Elective Course Approval Request has been rejected!", HttpStatus.OK);
    }

    public ResponseEntity<String> acceptElectiveCourseApprovalRequestByID(Long id, String feedback) {

        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Elective Course Approval Request with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        ElectiveCourseApprovalRequest electiveCourseApprovalRequest = electiveCourseApprovalRequestOptional.get();
        OutgoingStudent outgoingStudent = electiveCourseApprovalRequest.getStudent();
        Long outgoingStudentID = outgoingStudent.getID();

        if ( electiveCourseApprovalRequest.getStatus().equals("ACCEPTED") || electiveCourseApprovalRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Elective Course Approval Request has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // add the course to the department elective course list!
        if ( outgoingStudent.getIsErasmus() ) {

            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", HttpStatus.BAD_REQUEST);
            }

            // get the related department!
            ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                    .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                            erasmusUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            Course newAcceptedCourse = new Course();
            newAcceptedCourse.setCourseName(electiveCourseApprovalRequest.getCourseName());
            newAcceptedCourse.setDescription(electiveCourseApprovalRequest.getDescription());
            newAcceptedCourse.setEcts(electiveCourseApprovalRequest.getEcts()); // set the attributes

            // this method saves the course as well!
            // add the course to the accepted elective course list
            erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID(newAcceptedCourse, erasmusUniversityDepartment.getID());
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", HttpStatus.BAD_REQUEST);
            }

            ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentService
                    .getExchangeUniversityDepartmentByExchangeUniversityIDAndDepartmentName(
                            exchangeUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            Course newAcceptedCourse = new Course();
            newAcceptedCourse.setCourseName(electiveCourseApprovalRequest.getCourseName());
            newAcceptedCourse.setDescription(electiveCourseApprovalRequest.getDescription());
            newAcceptedCourse.setEcts(electiveCourseApprovalRequest.getEcts()); // set the attributes

            exchangeUniversityDepartmentService.addElectiveCourseByExchangeDepartmentID(newAcceptedCourse, exchangeUniversityDepartment.getID());
        }

        DepartmentCoordinator departmentCoordinator = electiveCourseApprovalRequest.getDepartmentCoordinator();

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Elective Course Approval Request has been accepted by the Department Coordinator: " +
                departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        electiveCourseApprovalRequest.setStatus("ACCEPTED");
        electiveCourseApprovalRequest.setFeedback(feedback); // add this to the rejected courses!!

        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
        return new ResponseEntity<>("Elective Course Approval Request has been accepted!", HttpStatus.OK);
    }
}
