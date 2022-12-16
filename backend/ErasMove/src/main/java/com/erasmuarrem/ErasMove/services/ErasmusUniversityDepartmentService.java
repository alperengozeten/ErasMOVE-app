package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ErasmusUniversityDepartmentService {

    private final ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository;
    private final CourseRepository courseRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ErasmusUniversityRepository erasmusUniversityRepository;
    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;
    private final ErasmusUniversityService erasmusUniversityService;

    @Autowired
    public ErasmusUniversityDepartmentService(ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository, CourseRepository courseRepository,
                                              OutgoingStudentRepository outgoingStudentRepository, ErasmusUniversityRepository erasmusUniversityRepository,
                                              ApplicationService applicationService, ApplicationRepository applicationRepository, ErasmusUniversityService erasmusUniversityService) {
        this.erasmusUniversityDepartmentRepository = erasmusUniversityDepartmentRepository;
        this.courseRepository = courseRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.erasmusUniversityRepository = erasmusUniversityRepository;
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
        this.erasmusUniversityService = erasmusUniversityService;
    }

    public List<ErasmusUniversityDepartment> getErasmusUniversityDepartments() {
        return erasmusUniversityDepartmentRepository.findAll();
    }

    public ErasmusUniversityDepartment getErasmusUniversityDepartmentByID(Long id) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        return erasmusUniversityDepartmentOptional.get();
    }

    public void addErasmusUniversityDepartment(ErasmusUniversityDepartment erasmusUniversityDepartment) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findByErasmusUniversityIDAndDepartmentName(erasmusUniversityDepartment.getErasmusUniversity().getID(),
                        erasmusUniversityDepartment.getDepartmentName());

        if ( erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with name:" + erasmusUniversityDepartment.getDepartmentName() +
                    " already exists in university with id:" + erasmusUniversityDepartment.getErasmusUniversity().getID());
        }

        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
    }

    public void deleteErasmusUniversityDepartmentByID(Long id) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        erasmusUniversityDepartmentRepository.deleteById(id);
    }

    public void addCourseByErasmusDepartmentID(Course course, Long id) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();
        List<Course> courseList = erasmusUniversityDepartment.getCourseList();

        for (Course departmentCourse : courseList) {
            if ( departmentCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Course with name:" + course.getCourseName() + " already exists in this department!");
            }
        }

        courseList.add(course);
        courseRepository.save(course);
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
    }

    public void deleteCourseByErasmusDepartmentIDAndCourseID(Long id, Long courseID) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(courseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist!");
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();
        List<Course> courseList = erasmusUniversityDepartment.getCourseList();
        Course course = courseOptional.get();

        if ( !courseList.contains(course) ) {
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist in erasmus department!");
        }

        courseList.remove(course);
        courseRepository.deleteById(courseID);
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
    }

    public String addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(Long id, Long outgoingStudentID) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            return "Erasmus University Department with id:" + id + " doesn't exist!";
        }

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(outgoingStudentID);

        if ( !outgoingStudentOptional.isPresent() ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        OutgoingStudent outgoingStudent = outgoingStudentOptional.get();

        if ( !outgoingStudent.getIsErasmus() ) {
            return "The student is an Exchange Applicant, cannot be added to an Erasmus University!";
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();
        ErasmusUniversity erasmusUniversity = erasmusUniversityDepartment.getErasmusUniversity();
        List<OutgoingStudent> acceptedStudents = erasmusUniversity.getAcceptedStudents();

        // CHECK IF DEPARTMENT NAMES MATCH
        if ( !outgoingStudent.getDepartment().getDepartmentName().equals(erasmusUniversityDepartment.getDepartmentName()) ) {
            return "Outgoing student has unmatching department:" + outgoingStudent.getDepartment().getDepartmentName() + "!";
        }

        if ( erasmusUniversityDepartment.getQuota() <= 0 ) {
            return "The Erasmus Department quota is full!";
        }

        if ( acceptedStudents.contains(outgoingStudent) ) {
            return "Outgoing student with id:" + id + " is already accepted to this university!";
        }

        Application application = applicationService.getByOutgoingStudentID(outgoingStudent.getID());

        if ( application == null ) {
            return "Student with id:" + outgoingStudent.getID() + " doesn't currently have an application!";
        }

        application.setAdmittedStatus("Admitted to " + erasmusUniversity.getUniversityName()); // set application status
        applicationRepository.save(application);

        acceptedStudents.add(outgoingStudent);
        erasmusUniversityDepartment.setQuota(erasmusUniversityDepartment.getQuota() - 1);
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
        erasmusUniversityRepository.save(erasmusUniversity);

        return "Student with id:" + outgoingStudentID + " has been added to the Erasmus University!";
    }

    public void deleteOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(Long id, Long outgoingStudentID) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(outgoingStudentID);

        if ( !outgoingStudentOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();
        ErasmusUniversity erasmusUniversity = erasmusUniversityDepartment.getErasmusUniversity();
        OutgoingStudent outgoingStudent = outgoingStudentOptional.get();
        List<OutgoingStudent> acceptedStudents = erasmusUniversity.getAcceptedStudents();

        // CHECK IF DEPARTMENT NAMES MATCH
        if ( !outgoingStudent.getDepartment().getDepartmentName().equals(erasmusUniversityDepartment.getDepartmentName()) ) {
            throw new IllegalStateException("Outgoing student has unmatching department:" + outgoingStudent.getDepartment().getDepartmentName() + "!");
        }

        if ( !acceptedStudents.contains(outgoingStudent) ) {
            throw new IllegalStateException("The Outgoing Student with id:" + outgoingStudentID + " is not accepted to this university!");
        }

        acceptedStudents.remove(outgoingStudent);
        erasmusUniversityDepartment.setQuota(erasmusUniversityDepartment.getQuota() + 1);
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
        erasmusUniversityRepository.save(erasmusUniversity);
    }

    public ErasmusUniversityDepartment getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(Long universityID, String departmentName) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findByErasmusUniversityIDAndDepartmentName(universityID, departmentName);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with departmentName:" + departmentName
            + " doesn't exist in University with id:" + universityID);
        }

        return erasmusUniversityDepartmentOptional.get();
    }

    public void addElectiveCourseByErasmusDepartmentID(Course course, Long id) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();
        List<Course> electiveCourseList = erasmusUniversityDepartment.getElectiveCourseList();

        for (Course electiveCourse : electiveCourseList) {
            if ( electiveCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Elective Course with name:" + course.getCourseName() + " already exists in this department!");
            }
        }

        electiveCourseList.add(course);
        courseRepository.save(course);
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
    }

    public void deleteElectiveCourseByErasmusDepartmentIDAndCourseID(Long id, Long electiveCourseID) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(electiveCourseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course with id:" + electiveCourseID + " doesn't exist!");
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();
        List<Course> electiveCourseList = erasmusUniversityDepartment.getElectiveCourseList();
        Course electiveCourse = courseOptional.get();

        if ( !electiveCourseList.contains(electiveCourse) ) {
            throw new IllegalStateException("Elective Course with id:" + electiveCourse + " doesn't exist in erasmus department!");
        }

        electiveCourseList.remove(electiveCourse); //  remove from the list
        courseRepository.deleteById(electiveCourseID); // delete the course
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment); // save the department back
    }

    public String updateQuotaByErasmusUniversityDepartmentID(Long id, int newQuota) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            return "Erasmus University Department with id:" + id + " doesn't exist!";
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = erasmusUniversityDepartmentOptional.get();

        erasmusUniversityDepartment.setQuota(newQuota);

        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment); // save the department back!
        return "The quota for Erasmus University Department with name:" + erasmusUniversityDepartment.getDepartmentName() +
                " for University:" + erasmusUniversityDepartment.getErasmusUniversity().getUniversityName() + " has been updated!";
    }

    public ResponseEntity<ErasmusUniversityDepartment> getErasmusUniversityDepartmentByAcceptedStudentID(Long acceptedStudentID) {
        Optional<OutgoingStudent> acceptedStudentOptional = outgoingStudentRepository.findById(acceptedStudentID);

        if ( !acceptedStudentOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + acceptedStudentID + " doesn't exist!");
        }

        OutgoingStudent acceptedStudent = acceptedStudentOptional.get();
        ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(acceptedStudentID);

        if ( erasmusUniversity == null ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        ErasmusUniversityDepartment erasmusUniversityDepartment = getErasmusUniversityDepartmentByErasmusUniversityIDAndDepartmentName(
                erasmusUniversity.getID(), acceptedStudent.getDepartment().getDepartmentName()
        );

        return new ResponseEntity<>(erasmusUniversityDepartment, HttpStatus.OK);
    }
}
