package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private final ExchangeUniversityService exchangeUniversityService;
    private final ExchangeUniversityRepository exchangeUniversityRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public MandatoryCourseApprovalRequestService(MandatoryCourseApprovalRequestRepository mandatoryCourseApprovalRequestRepository, CourseCoordinatorRepository courseCoordinatorRepository, CourseCoordinatorService courseCoordinatorService, OutgoingStudentRepository outgoingStudentRepository, OutgoingStudentService outgoingStudentService, ErasmusUniversityService erasmusUniversityService, ErasmusUniversityRepository erasmusUniversityRepository, ExchangeUniversityService exchangeUniversityService, ExchangeUniversityRepository exchangeUniversityRepository, CourseRepository courseRepository) {
        this.mandatoryCourseApprovalRequestRepository = mandatoryCourseApprovalRequestRepository;
        this.courseCoordinatorRepository = courseCoordinatorRepository;
        this.courseCoordinatorService = courseCoordinatorService;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.outgoingStudentService = outgoingStudentService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.erasmusUniversityRepository = erasmusUniversityRepository;
        this.exchangeUniversityService = exchangeUniversityService;
        this.exchangeUniversityRepository = exchangeUniversityRepository;
        this.courseRepository = courseRepository;
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

    public String addMandatoryCourseApprovalRequest(MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest) {
        Long courseCoordinatorID = mandatoryCourseApprovalRequest.getCourseCoordinator().getID();
        Long outgoingStudentID = mandatoryCourseApprovalRequest.getStudent().getID();

        if ( !courseCoordinatorRepository.existsById(courseCoordinatorID) ) {
            return "Course Coordinator with id:" + courseCoordinatorID + " doesn't exist!";
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        // get the student and the department coordinator
        // since they are not automatically pulled, because the request isn't pulled from the database
        OutgoingStudent outgoingStudent = outgoingStudentService.getStudentByID(outgoingStudentID).get();
        CourseCoordinator courseCoordinator = courseCoordinatorService.getCourseCoordinatorByID(courseCoordinatorID);

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
            }

            List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

            for (Course rejectedCourse: rejectedCourses) {
                if ( rejectedCourse.getCourseName().equals(mandatoryCourseApprovalRequest.getCourseName()) ) {
                    return "Mandatory Course with name:" + mandatoryCourseApprovalRequest.getCourseName() + " has already been rejected!";
                }
            }
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
            }

            List<Course> rejectedCourses = exchangeUniversity.getRejectedCourses();

            for (Course rejectedCourse: rejectedCourses) {
                if ( rejectedCourse.getCourseName().equals(mandatoryCourseApprovalRequest.getCourseName()) ) {
                    return "Mandatory Course with name:" + mandatoryCourseApprovalRequest.getCourseName() + " has already been rejected!";
                }
            }
        }

        mandatoryCourseApprovalRequest.setStatus("WAITING"); // set status before saving
        mandatoryCourseApprovalRequestRepository.save(mandatoryCourseApprovalRequest);
        return "Mandatory Course Request has been sent!";
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

    public String declineMandatoryCourseApprovalRequestByID(Long id, String feedback) {

        Optional<MandatoryCourseApprovalRequest> mandatoryCourseApprovalRequestOptional = mandatoryCourseApprovalRequestRepository
                .findById(id);

        if ( !mandatoryCourseApprovalRequestOptional.isPresent() ) {
            return "Mandatory Course Approval Request with id:" + id + " doesn't exist!";
        }

        MandatoryCourseApprovalRequest mandatoryCourseApprovalRequest = mandatoryCourseApprovalRequestOptional.get();
        OutgoingStudent outgoingStudent = mandatoryCourseApprovalRequest.getStudent();
        Long outgoingStudentID = outgoingStudent.getID();

        // add the course to the list of rejected courses!
        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
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
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
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

        mandatoryCourseApprovalRequest.setStatus("DECLINED");
        mandatoryCourseApprovalRequest.setFeedback(feedback); // add this to the rejected courses!!

        mandatoryCourseApprovalRequestRepository.save(mandatoryCourseApprovalRequest);
        return "Mandatory Course Approval Request has been rejected!";
    }
}
