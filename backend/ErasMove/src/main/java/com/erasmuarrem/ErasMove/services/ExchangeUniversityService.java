package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ExchangeUniversity;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeUniversityRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ExchangeUniversityService {

    private final ExchangeUniversityRepository exchangeUniversityRepository;
    private final CourseRepository courseRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;

    @Autowired
    public ExchangeUniversityService(ExchangeUniversityRepository exchangeUniversityRepository, CourseRepository courseRepository, OutgoingStudentRepository outgoingStudentRepository) {
        this.exchangeUniversityRepository = exchangeUniversityRepository;
        this.courseRepository = courseRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
    }

    public List<ExchangeUniversity> getExchangeUniversities() {
        return exchangeUniversityRepository.findAll();
    }

    public ExchangeUniversity getExchangeUniversityByID(Long id) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findById(id);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with id:" + id + " doesn't exist!");
        }

        return exchangeUniversityOptional.get();
    }

    public ExchangeUniversity getExchangeUniversityByName(String universityName) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findByUniversityName(universityName);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with name:" + universityName + " doesn't exist!");
        }

        return exchangeUniversityOptional.get();
    }

    public void addExchangeUniversity(ExchangeUniversity exchangeUniversity) {
        String universityName = exchangeUniversity.getUniversityName();
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findByUniversityName(universityName);

        if ( exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with name:" + universityName + " already exists!");
        }

        exchangeUniversityRepository.save(exchangeUniversity);
    }

    public void deleteExchangeUniversityByID(Long id) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findById(id);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with id:" + id + " doesn't exist!");
        }

        exchangeUniversityRepository.deleteById(id);
    }

    public List<ExchangeUniversity> getExchangeUniversitiesByCountryName(String countryName) {
        return exchangeUniversityRepository.findByCountry(countryName);
    }

    public void addRejectedCourseByID(Course course, Long exchangeUniversityID) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findById(exchangeUniversityID);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with id:" + exchangeUniversityID + " doesn't exist!");
        }

        ExchangeUniversity exchangeUniversity = exchangeUniversityOptional.get();
        List<Course> rejectedCourses = exchangeUniversity.getRejectedCourses();

        for (Course rejectedCourse : rejectedCourses) {
            if ( rejectedCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Course with name:" + course.getCourseName() + " already rejected for this university!");
            }
        }

        courseRepository.save(course);

        exchangeUniversity.getRejectedCourses().add(course);

        exchangeUniversityRepository.save(exchangeUniversity);
    }

    public void deleteRejectedCourseByIDAndCourseID(Long id, Long courseID) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findById(id);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(courseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist!");
        }

        ExchangeUniversity exchangeUniversity = exchangeUniversityOptional.get();
        Course deleteCourse = courseOptional.get();
        List<Course> rejectedCourses = exchangeUniversity.getRejectedCourses();
        boolean courseExists = false;

        for (Course rejectedCourse : rejectedCourses) {
            if ( rejectedCourse.getCourseName().equals(deleteCourse.getCourseName()) ) {
                courseExists = true;
                break;
            }
        }

        if ( !courseExists ) {
            throw new IllegalStateException("Course with id:" + courseID + " isn't in rejected courses!");
        }

        rejectedCourses.remove(deleteCourse);

        courseRepository.deleteById(courseID);
        exchangeUniversityRepository.save(exchangeUniversity);
    }

    public void addOutgoingStudentByIDAndOutgoingStudentID(Long id, Long outgoingStudentID) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findById(id);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with id:" + id + " doesn't exist!");
        }

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(outgoingStudentID);

        if ( !outgoingStudentOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        ExchangeUniversity exchangeUniversity = exchangeUniversityOptional.get();

        if ( exchangeUniversity.getUniversityQuota() == 0 ) {
            throw new IllegalStateException("The university quota is full!");
        }

        OutgoingStudent outgoingStudent = outgoingStudentOptional.get();
        List<OutgoingStudent> acceptedStudents = exchangeUniversity.getAcceptedStudents();

        if ( acceptedStudents.contains(outgoingStudent) ) {
            throw new IllegalStateException("Student with id:" + outgoingStudentID + " is already accepted!");
        }

        acceptedStudents.add(outgoingStudent);
        exchangeUniversity.setUniversityQuota(exchangeUniversity.getUniversityQuota() - 1);
        exchangeUniversityRepository.save(exchangeUniversity);
    }

    public void deleteOutgoingStudentByIDAndOutgoingStudentID(Long id, Long outgoingStudentID) {
        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findById(id);

        if ( !exchangeUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University with id:" + id + " doesn't exist!");
        }

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(outgoingStudentID);

        if ( !outgoingStudentOptional.isPresent() ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        ExchangeUniversity exchangeUniversity = exchangeUniversityOptional.get();
        OutgoingStudent outgoingStudent = outgoingStudentOptional.get();
        List<OutgoingStudent> acceptedStudents = exchangeUniversity.getAcceptedStudents();

        if ( !acceptedStudents.contains(outgoingStudent) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " isn't accepted!");
        }

        acceptedStudents.remove(outgoingStudent); // remove the student from the list
        exchangeUniversity.setUniversityQuota(exchangeUniversity.getUniversityQuota() + 1); // update the quota
        exchangeUniversityRepository.save(exchangeUniversity);
    }

    public ExchangeUniversity getExchangeUniversityByAcceptedStudentID(Long acceptedStudentID) {

        if ( !outgoingStudentRepository.existsById(acceptedStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + acceptedStudentID + " doesn't exist!");
        }

        Optional<ExchangeUniversity> exchangeUniversityOptional = exchangeUniversityRepository.findByAcceptedStudents_ID(acceptedStudentID);

        return exchangeUniversityOptional.orElse(null);
    }

    public List<OutgoingStudent> getAllAcceptedOutgoingStudentsByDepartmentID(Long departmentID) {
        List<OutgoingStudent> acceptedStudents = new ArrayList<>();
        List<ExchangeUniversity> exchangeUniversityList = exchangeUniversityRepository.findAll();

        for (ExchangeUniversity exchangeUniversity : exchangeUniversityList) {
            List<OutgoingStudent> studentList = exchangeUniversity.getAcceptedStudents();

            for (OutgoingStudent outgoingStudent : studentList) {
                if ( Objects.equals(outgoingStudent.getDepartment().getID(), departmentID) ) {
                    acceptedStudents.add(outgoingStudent);
                }
            }
        }

        return acceptedStudents;
    }

    public List<OutgoingStudent> getAllAcceptedOutgoingStudents() {
        List<OutgoingStudent> acceptedStudents = new ArrayList<>();
        List<ExchangeUniversity> exchangeUniversityList = exchangeUniversityRepository.findAll();

        for (ExchangeUniversity exchangeUniversity : exchangeUniversityList) {
            acceptedStudents.addAll(exchangeUniversity.getAcceptedStudents());
        }

        return acceptedStudents;
    }
}
