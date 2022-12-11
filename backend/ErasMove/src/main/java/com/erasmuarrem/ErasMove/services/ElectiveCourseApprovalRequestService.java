package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private final CourseRepository courseRepository;

    @Autowired
    public ElectiveCourseApprovalRequestService(ElectiveCourseApprovalRequestRepository electiveCourseApprovalRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, OutgoingStudentRepository outgoingStudentRepository, OutgoingStudentService outgoingStudentService, DepartmentCoordinatorService departmentCoordinatorService, ErasmusUniversityService erasmusUniversityService, ErasmusUniversityRepository erasmusUniversityRepository, ExchangeUniversityService exchangeUniversityService, ExchangeUniversityRepository exchangeUniversityRepository, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, CourseRepository courseRepository) {
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
        this.courseRepository = courseRepository;
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

    public String addElectiveCourseApprovalRequest(ElectiveCourseApprovalRequest electiveCourseApprovalRequest) {
        Long departmentCoordinatorID = electiveCourseApprovalRequest.getDepartmentCoordinator().getID();
        Long outgoingStudentID = electiveCourseApprovalRequest.getStudent().getID();

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            return "Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!";
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        // get the student and the department coordinator
        // since they are not automatically pulled, because the request isn't pulled from the database
        OutgoingStudent outgoingStudent = outgoingStudentService.getStudentByID(outgoingStudentID).get();
        DepartmentCoordinator departmentCoordinator = departmentCoordinatorService.getDepartmentCoordinatorById(departmentCoordinatorID);

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
            }

            List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

            for (Course rejectedCourse: rejectedCourses) {
                if ( rejectedCourse.getCourseName().equals(electiveCourseApprovalRequest.getCourseName()) ) {
                    return "Elective Course with name:" + electiveCourseApprovalRequest.getCourseName() + " has already been rejected!";
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
                if ( rejectedCourse.getCourseName().equals(electiveCourseApprovalRequest.getCourseName()) ) {
                    return "Elective Course with name:" + electiveCourseApprovalRequest.getCourseName() + " has already been rejected!";
                }
            }
        }

        electiveCourseApprovalRequest.setStatus("WAITING"); // set status before saving
        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
        return "Elective Course Request has been sent!";
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

    public String declineElectiveCourseApprovalRequestByID(Long id, String feedback) {

        Optional<ElectiveCourseApprovalRequest> electiveCourseApprovalRequestOptional = electiveCourseApprovalRequestRepository
                .findById(id);

        if ( !electiveCourseApprovalRequestOptional.isPresent() ) {
            return "Elective Course Approval Request with id:" + id + " doesn't exist!";
        }

        ElectiveCourseApprovalRequest electiveCourseApprovalRequest = electiveCourseApprovalRequestOptional.get();
        OutgoingStudent outgoingStudent = electiveCourseApprovalRequest.getStudent();
        Long outgoingStudentID = outgoingStudent.getID();

        // add the course to the list of rejected courses!
        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
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
                return "Outgoing Student with id:" + outgoingStudentID + " isn't accepted to a university!";
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

        electiveCourseApprovalRequest.setStatus("DECLINED");
        electiveCourseApprovalRequest.setFeedback(feedback); // add this to the rejected courses!!

        electiveCourseApprovalRequestRepository.save(electiveCourseApprovalRequest);
        return "Elective Course Approval Request has been rejected!";
    }
}
