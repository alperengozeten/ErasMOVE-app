package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeUniversityDepartmentRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeUniversityRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeUniversityDepartmentService {

    private final ExchangeUniversityDepartmentRepository exchangeUniversityDepartmentRepository;
    private final CourseRepository courseRepository;
    private final ExchangeUniversityService exchangeUniversityService;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ExchangeUniversityRepository exchangeUniversityRepository;

    @Autowired
    public ExchangeUniversityDepartmentService(ExchangeUniversityDepartmentRepository exchangeUniversityDepartmentRepository, CourseRepository courseRepository, ExchangeUniversityService exchangeUniversityService, OutgoingStudentRepository outgoingStudentRepository, ExchangeUniversityRepository exchangeUniversityRepository) {
        this.exchangeUniversityDepartmentRepository = exchangeUniversityDepartmentRepository;
        this.courseRepository = courseRepository;
        this.exchangeUniversityService = exchangeUniversityService;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.exchangeUniversityRepository = exchangeUniversityRepository;
    }

    public List<ExchangeUniversityDepartment> getExchangeUniversityDepartments() {
        return exchangeUniversityDepartmentRepository.findAll();
    }

    public ExchangeUniversityDepartment getExchangeUniversityDepartmentByID(Long id) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        return exchangeUniversityDepartmentOptional.get();
    }

    public void addExchangeUniversityDepartment(ExchangeUniversityDepartment exchangeUniversityDepartment) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findByExchangeUniversityIDAndDepartmentName(exchangeUniversityDepartment.getExchangeUniversity().getID(),
                        exchangeUniversityDepartment.getDepartmentName());

        if ( exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with name:" + exchangeUniversityDepartment.getDepartmentName() +
                    " alredy exists in university with id:" + exchangeUniversityDepartment.getExchangeUniversity().getID());
        }

        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public void deleteExchangeUniversityDepartmentByID(Long id) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        exchangeUniversityDepartmentRepository.deleteById(id);
    }

    public void addCourseByExchangeDepartmentID(Course course, Long id) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentOptional.get();
        List<Course> courseList = exchangeUniversityDepartment.getCourseList();

        for (Course departmentCourse : courseList) {
            if ( departmentCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Course with name:" + course.getCourseName() + " already exists in this department!");
            }
        }

        courseList.add(course);
        courseRepository.save(course);
        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public void deleteCourseByExchangeDepartmentIDAndCourseID(Long id, Long courseID) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(courseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist!");
        }

        ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentOptional.get();
        List<Course> courseList = exchangeUniversityDepartment.getCourseList();
        Course course = courseOptional.get();

        if ( !courseList.contains(course) ) {
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist in exchange department!");
        }

        courseList.remove(course);
        courseRepository.deleteById(courseID);
        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public void deleteCourseByExchangeDepartmentIDAndCourseName(Long id, String courseName) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentOptional.get();
        List<Course> courseList = exchangeUniversityDepartment.getCourseList();
        boolean courseNameExists = false;
        Course foundCourse = null;

        for (Course course : courseList) {
            if ( course.getCourseName().equals(courseName) ) {
                courseNameExists = true;
                foundCourse = course;
                break;
            }
        }

        if ( !courseNameExists ) {
            throw new IllegalStateException("Course with name:" + courseName + " doesn't exist in the exchange university department!");
        }

        courseList.remove(foundCourse);
        courseRepository.deleteById(foundCourse.getID());
        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public ExchangeUniversityDepartment getExchangeUniversityDepartmentByExchangeUniversityIDAndDepartmentName(Long universityID, String departmentName) {
        if ( !exchangeUniversityRepository.existsById(universityID) ) {
            throw new IllegalStateException("Exchange University with id:" + universityID + " doesn't exist!");
        }

        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findByExchangeUniversityIDAndDepartmentName(universityID, departmentName);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with departmentName:" + departmentName
                    + " doesn't exist in University with id:" + universityID);
        }

        return exchangeUniversityDepartmentOptional.get();
    }

    public void addElectiveCourseByExchangeDepartmentID(Course course, Long id) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentOptional.get();
        List<Course> electiveCourseList = exchangeUniversityDepartment.getElectiveCourseList();

        for (Course electiveCourse : electiveCourseList) {
            if ( electiveCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Elective Course with name:" + course.getCourseName() + " already exists in this department!");
            }
        }

        electiveCourseList.add(course);
        courseRepository.save(course);
        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public void deleteElectiveCourseByExchangeDepartmentIDAndCourseID(Long id, Long electiveCourseID) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(electiveCourseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course with id:" + electiveCourseID + " doesn't exist!");
        }

        ExchangeUniversityDepartment exchangeUniversityDepartment = exchangeUniversityDepartmentOptional.get();
        List<Course> electiveCourseList = exchangeUniversityDepartment.getElectiveCourseList();
        Course electiveCourse = courseOptional.get();

        if ( !electiveCourseList.contains(electiveCourse) ) {
            throw new IllegalStateException("Course with id:" + electiveCourseID + " doesn't exist in exchange department!");
        }

        electiveCourseList.remove(electiveCourse);
        courseRepository.deleteById(electiveCourseID);
        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public ResponseEntity<ExchangeUniversityDepartment> getExchangeUniversityDepartmentByAcceptedStudentID(Long acceptedStudentID) {
        Optional<OutgoingStudent> acceptedStudentOptional = outgoingStudentRepository.findById(acceptedStudentID);

        if ( !acceptedStudentOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + acceptedStudentID + " doesn't exist!");
        }

        OutgoingStudent acceptedStudent = acceptedStudentOptional.get();
        ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(acceptedStudentID);

        if ( exchangeUniversity == null ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        ExchangeUniversityDepartment exchangeUniversityDepartment = getExchangeUniversityDepartmentByExchangeUniversityIDAndDepartmentName(
                exchangeUniversity.getID(), acceptedStudent.getDepartment().getDepartmentName()
        );

        return new ResponseEntity<>(exchangeUniversityDepartment, HttpStatus.OK);
    }

    public List<ExchangeUniversityDepartment> getExchangeUniversityDepartmentByExchangeUniversityID(Long exchangeUniversityID) {

        if ( !exchangeUniversityRepository.existsById(exchangeUniversityID) ) {
            throw new IllegalStateException("Exchange University with id:" + exchangeUniversityID + " doesn't exist!");
        }

        return exchangeUniversityDepartmentRepository.findByExchangeUniversity_ID(exchangeUniversityID);
    }
}
