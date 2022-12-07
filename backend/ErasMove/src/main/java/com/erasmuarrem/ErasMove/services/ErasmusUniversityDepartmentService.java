package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import com.erasmuarrem.ErasMove.models.ErasmusUniversityDepartment;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.ErasmusUniversityDepartmentRepository;
import com.erasmuarrem.ErasMove.repositories.ErasmusUniversityRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ErasmusUniversityDepartmentService {

    private final ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository;
    private final CourseRepository courseRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ErasmusUniversityRepository erasmusUniversityRepository;

    @Autowired
    public ErasmusUniversityDepartmentService(ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository, CourseRepository courseRepository, OutgoingStudentRepository outgoingStudentRepository, ErasmusUniversityRepository erasmusUniversityRepository) {
        this.erasmusUniversityDepartmentRepository = erasmusUniversityDepartmentRepository;
        this.courseRepository = courseRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.erasmusUniversityRepository = erasmusUniversityRepository;
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
                    " alredy exists in university with id:" + erasmusUniversityDepartment.getErasmusUniversity().getID());
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

    public void addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(Long id, Long outgoingStudentID) {
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
            throw new IllegalStateException("Outgoing student has unmatching deparment:" + outgoingStudent.getDepartment().getDepartmentName() + "!");
        }

        if ( erasmusUniversityDepartment.getQuota() <= 0 ) {
            throw new IllegalStateException("The Erasmus Department quota is full!");
        }

        if ( acceptedStudents.contains(outgoingStudent) ) {
            throw new IllegalStateException("Outgoing student with id:" + id + " is already accepted to this university!");
        }

        acceptedStudents.add(outgoingStudent);
        erasmusUniversityDepartment.setQuota(erasmusUniversityDepartment.getQuota() - 1);
        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
        erasmusUniversityRepository.save(erasmusUniversity);
    }
}
