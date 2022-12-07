package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ExchangeUniversityDepartment;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeUniversityDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeUniversityDepartmentService {

    private final ExchangeUniversityDepartmentRepository exchangeUniversityDepartmentRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public ExchangeUniversityDepartmentService(ExchangeUniversityDepartmentRepository exchangeUniversityDepartmentRepository, CourseRepository courseRepository) {
        this.exchangeUniversityDepartmentRepository = exchangeUniversityDepartmentRepository;
        this.courseRepository = courseRepository;
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
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist in erasmus department!");
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
            throw new IllegalStateException("Course with name:" + courseName + " doesn't exist in the erasmus university department!");
        }

        courseList.remove(foundCourse);
        courseRepository.deleteById(foundCourse.getID());
        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public ExchangeUniversityDepartment getExchangeUniversityDepartmentByExchangeUniversityIDAndDepartmentName(Long universityID, String departmentName) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findByExchangeUniversityIDAndDepartmentName(universityID, departmentName);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with departmentName:" + departmentName
                    + " doesn't exist in University with id:" + universityID);
        }

        return exchangeUniversityDepartmentOptional.get();
    }
}
