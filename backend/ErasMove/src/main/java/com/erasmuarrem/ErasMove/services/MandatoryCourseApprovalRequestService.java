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
public class MandatoryCourseApprovalRequestService {

    private final MandatoryCourseApprovalRequestRepository mandatoryCourseApprovalRequestRepository;
    private final CourseCoordinatorRepository courseCoordinatorRepository;
    private final CourseCoordinatorService courseCoordinatorService;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final OutgoingStudentService outgoingStudentService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ErasmusUniversityRepository erasmusUniversityRepository;
    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;
    private final ExchangeUniversityService exchangeUniversityService;
    private final ExchangeUniversityRepository exchangeUniversityRepository;
    private final ExchangeUniversityDepartmentService exchangeUniversityDepartmentService;
    private final CourseRepository courseRepository;
    private final NotificationService notificationService;

    @Autowired
    public MandatoryCourseApprovalRequestService(MandatoryCourseApprovalRequestRepository mandatoryCourseApprovalRequestRepository, CourseCoordinatorRepository courseCoordinatorRepository, CourseCoordinatorService courseCoordinatorService, OutgoingStudentRepository outgoingStudentRepository, OutgoingStudentService outgoingStudentService, ErasmusUniversityService erasmusUniversityService, ErasmusUniversityRepository erasmusUniversityRepository, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, ExchangeUniversityService exchangeUniversityService, ExchangeUniversityRepository exchangeUniversityRepository, ExchangeUniversityDepartmentService exchangeUniversityDepartmentService, CourseRepository courseRepository, NotificationService notificationService) {
        this.mandatoryCourseApprovalRequestRepository = mandatoryCourseApprovalRequestRepository;
        this.courseCoordinatorRepository = courseCoordinatorRepository;
        this.courseCoordinatorService = courseCoordinatorService;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.outgoingStudentService = outgoingStudentService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.erasmusUniversityRepository = erasmusUniversityRepository;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.exchangeUniversityService = exchangeUniversityService;
        this.exchangeUniversityRepository = exchangeUniversityRepository;
        this.exchangeUniversityDepartmentService = exchangeUniversityDepartmentService;
        this.courseRepository = courseRepository;
        this.notificationService = notificationService;
    }


    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequests() {
        return mandatoryCourseApprovalRequestRepository.findAll();
    }

    public MandatoryCourseApprovalRequest getMandatoryCourseApprovalRequestByID(Long id) {
        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Mandatory Course Approval Request with id:" + id + " doesn't exist!");
        }

        return mandatoryCourseApprovalRequestOptional.get();
    }

    public ResponseEntity<ResponseMessage> addMandatoryCourseApprovalRequest(MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest) {
        Long outgoingStudentID = mandatoryCourseApprovalRequest.getStudent().getID();
        Long correspondingCourseID = mandatoryCourseApprovalRequest.getCorrespondingCourse().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        if ( !courseRepository.existsById(correspondingCourseID) ) {
            return new ResponseEntity<>(new ResponseMessage("Corresponding course with id: " + correspondingCourseID + " doesn't exist!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        Course correspondingCourse = courseRepository.findById(correspondingCourseID).get();

        // get the student and the department coordinator
        // since they are not automatically pulled, because the request isn't pulled from the database
        OutgoingStudent outgoingStudent = outgoingStudentService.getStudentByID(outgoingStudentID).get();

        // search for the existence of the course-coordinator
        CourseCoordinator courseCoordinator = courseCoordinatorService.getCourseCoordinatorByCourseID(
                mandatoryCourseApprovalRequest.getCorrespondingCourse().getID()
        );

        if ( courseCoordinator == null ) {
            return new ResponseEntity<>(new ResponseMessage("There is no Course Coordinator for the course: " + correspondingCourse.getCourseName() + " to respond", (long) -1),
                    HttpStatus.BAD_REQUEST);
        }

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", (long) -1), HttpStatus.BAD_REQUEST);
            }

            // get the related department!
            ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentService
                    .getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                            erasmusUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

            for (Course rejectedCourse: rejectedCourses) {
                if ( rejectedCourse.getCourseName().equals(mandatoryCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Mandatory Course with name:" + mandatoryCourseApprovalRequest.getCourseName() + " has already been rejected!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }

            List<Course> acceptedCourses = erasmusUniversityDepartment.getCourseList();

            for (Course acceptedCourse: acceptedCourses) {
                if ( acceptedCourse.getCourseName().equals(mandatoryCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Mandatory Course with name:" + mandatoryCourseApprovalRequest.getCourseName() + " has already been accepted!", (long) -1), HttpStatus.BAD_REQUEST);
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
                if ( rejectedCourse.getCourseName().equals(mandatoryCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Mandatory Course with name:" + mandatoryCourseApprovalRequest.getCourseName() + " has already been rejected!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }

            ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentService
                    .getExchangeUniversityDepartmentByExchangeUniversityIDAndDepartmentName(
                            exchangeUniversity.getID(), outgoingStudent.getDepartment().getDepartmentName()
                    );

            List<Course> acceptedCourses = exchangeUniversityDepartment.getCourseList();

            for (Course acceptedCourse: acceptedCourses) {
                if ( acceptedCourse.getCourseName().equals(mandatoryCourseApprovalRequest.getCourseName()) ) {
                    return new ResponseEntity<>(new ResponseMessage("Mandatory Course with name:" + mandatoryCourseApprovalRequest.getCourseName() + " has already been accepted!", (long) -1), HttpStatus.BAD_REQUEST);
                }
            }
        }

        // send notification to the course coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(courseCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("You have a new Mandatory Course Approval Request by Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        mandatoryCourseApprovalRequest.setCourseCoordinator(courseCoordinator);
        mandatoryCourseApprovalRequest.setStatus("WAITING"); // set status before saving
        mandatoryCourseApprovalRequestRepository.save(mandatoryCourseApprovalRequest);
        return new ResponseEntity<>(new ResponseMessage("Mandatory Course Request has been sent!", mandatoryCourseApprovalRequest.getID()), HttpStatus.OK);
    }

    public void deleteMandatoryCourseApprovalRequestByID(Long id) {
        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            throw new IllegalStateException("Mandatory Course Approval Request with id:" + id + " doesn't exist!");
        }

        mandatoryCourseApprovalRequestRepository.deleteById(id);
    }

    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestByCourseCoordinatorID(Long id) {
        return mandatoryCourseApprovalRequestRepository.findByCourseCoordinatorID(id);
    }

    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestByOutgoingStudentID(Long id) {
        return mandatoryCourseApprovalRequestRepository.findByStudentID(id);
    }

    public List<MandatoryCourseApprovalRequest> getMandatoryCourseApprovalRequestsByCourseCoordinatorAndOutgoingStudentID(Long courseCoordinatorID, Long outgoingStudentID) {
        if ( !courseCoordinatorRepository.existsById(courseCoordinatorID) ) {
            throw new IllegalStateException("Course Coordinator with id:" + courseCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return mandatoryCourseApprovalRequestRepository.findByCourseCoordinatorIDAndStudentID(courseCoordinatorID, outgoingStudentID);
    }

    public ResponseEntity<String> declineMandatoryCourseApprovalRequestByID(Long id, String feedback) {

        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Mandatory Course Approval Request with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest = mandatoryCourseApprovalRequestOptional.get();
        OutgoingStudent outgoingStudent = mandatoryCourseApprovalRequest.getStudent();
        Long outgoingStudentID = outgoingStudent.getID();

        if ( mandatoryCourseApprovalRequest.getStatus().equals("ACCEPTED") || mandatoryCourseApprovalRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Mandatory Course Approval Request has already been responded!", HttpStatus.BAD_REQUEST);
        }

        // add the course to the list of rejected courses!
        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!", HttpStatus.BAD_REQUEST);
            }

            List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

            Course newRejectedCourse = new Course();
            newRejectedCourse.setCourseName(mandatoryCourseApprovalRequest.getCourseName());
            newRejectedCourse.setDescription(mandatoryCourseApprovalRequest.getDescription());
            newRejectedCourse.setEcts(mandatoryCourseApprovalRequest.getEcts()); // set the attributes

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
            newRejectedCourse.setCourseName(mandatoryCourseApprovalRequest.getCourseName());
            newRejectedCourse.setDescription(mandatoryCourseApprovalRequest.getDescription());
            newRejectedCourse.setEcts(mandatoryCourseApprovalRequest.getEcts()); // set the attributes

            courseRepository.save(newRejectedCourse); // save the course

            rejectedCourses.add(newRejectedCourse); // add the course to the list

            exchangeUniversityRepository.save(exchangeUniversity); // save the university back
        }

        CourseCoordinator courseCoordinator = mandatoryCourseApprovalRequest.getCourseCoordinator();

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Elective Course Approval Request has been rejected by the Course Coordinator: " +
                courseCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        mandatoryCourseApprovalRequest.setStatus("DECLINED");
        mandatoryCourseApprovalRequest.setFeedback(feedback); // add this to the rejected courses!!

        mandatoryCourseApprovalRequestRepository.save(mandatoryCourseApprovalRequest);
        return new ResponseEntity<>("Mandatory Course Approval Request has been rejected!", HttpStatus.OK);
    }

    public ResponseEntity<String> acceptMandatoryCourseApprovalRequestByID(Long id, String feedback) {

        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Mandatory Course Approval Request with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest = mandatoryCourseApprovalRequestOptional.get();
        OutgoingStudent outgoingStudent = mandatoryCourseApprovalRequest.getStudent();
        Long outgoingStudentID = outgoingStudent.getID();

        if ( mandatoryCourseApprovalRequest.getStatus().equals("ACCEPTED") || mandatoryCourseApprovalRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Mandatory Course Approval Request has already been responded!", HttpStatus.BAD_REQUEST);
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
            newAcceptedCourse.setCourseName(mandatoryCourseApprovalRequest.getCourseName());
            newAcceptedCourse.setDescription(mandatoryCourseApprovalRequest.getDescription());
            newAcceptedCourse.setEcts(mandatoryCourseApprovalRequest.getEcts()); // set the attributes

            // this method saves the course as well!
            // add the course to the accepted mandatory course list
            erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(newAcceptedCourse, erasmusUniversityDepartment.getID());
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
            newAcceptedCourse.setCourseName(mandatoryCourseApprovalRequest.getCourseName());
            newAcceptedCourse.setDescription(mandatoryCourseApprovalRequest.getDescription());
            newAcceptedCourse.setEcts(mandatoryCourseApprovalRequest.getEcts()); // set the attributes

            // add mandatory course to the department
            exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(newAcceptedCourse, exchangeUniversityDepartment.getID());
        }

        CourseCoordinator courseCoordinator = mandatoryCourseApprovalRequest.getCourseCoordinator();

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Elective Course Approval Request has been accepted by the Course Coordinator: " +
                courseCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        mandatoryCourseApprovalRequest.setStatus("ACCEPTED");
        mandatoryCourseApprovalRequest.setFeedback(feedback); // add this to the rejected courses!!

        mandatoryCourseApprovalRequestRepository.save(mandatoryCourseApprovalRequest);
        return new ResponseEntity<>("Mandatory Course Approval Request has been accepted!", HttpStatus.OK);
    }
}
