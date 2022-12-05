package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.IncomingStudent;
import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.IncomingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncomingStudentService {
    private final IncomingStudentRepository incomingStudentRepository;
    private final CourseRepository courseRepository;
    @Autowired
    public IncomingStudentService( IncomingStudentRepository incomingStudentRepository , CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
        this.incomingStudentRepository = incomingStudentRepository;
    }

    public void addIncomingStudent(IncomingStudent incomingStudent) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findByEmail( incomingStudent.getEmail() );
        if ( incomingStudentOptional.isPresent() ) {
            throw new IllegalStateException("The incoming student with email "+ incomingStudent.getEmail() + " already exists.");
        }
        incomingStudentRepository.save(incomingStudent);
    }
    public void deleteIncomingStudentById( Long id ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById(id);
        if ( !incomingStudentOptional.isPresent() ) {
            throw new IllegalStateException("The incoming student with id  "+ id + " doesn't exist.");
        }
        incomingStudentRepository.deleteById(id);
    }

    public IncomingStudent getIncomingStudentById( Long id) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById( id );
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with id  "+ id + " doesn't exist.");
        }
        return incomingStudentOptional.get();
    }

    public List<IncomingStudent> getIncomingStudents() {
        return incomingStudentRepository.findAll();
    }

    public void addCourseToPreferredCoursesById( Long studentId, Long courseId ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById( studentId );
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with id  "+ studentId + " doesn't exist.");
        }

        Optional<Course> courseOptional = courseRepository.findById( courseId);
        if( !courseOptional.isPresent() ) {
            throw new IllegalStateException("The course with id " + courseId + " doesn't exist in host university."   );
        }

        IncomingStudent newIncomingStudent = incomingStudentOptional.get();

        List<Course> newCourseList = newIncomingStudent.getPreferredCourses();
        if ( !newCourseList.contains(courseOptional.get()) ) {
            newCourseList.add(courseOptional.get());
        }
        else {
            throw new IllegalStateException("The course with id " + courseId + " is already in student's preferred course list."   );

        }
        newIncomingStudent.setPreferredCourses(newCourseList);

        incomingStudentRepository.save(incomingStudentOptional.get());
    }

    public void deleteCourseFromPreferredCoursesById( Long studentId, Long courseId ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById( studentId );
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with id  "+ studentId + " doesn't exist.");
        }

        Optional<Course> courseOptional = courseRepository.findById( courseId);
        if( !courseOptional.isPresent() ) {
            throw new IllegalStateException("The course with id " + courseId + " doesn't exist in host university."   );
        }

        IncomingStudent newIncomingStudent = incomingStudentOptional.get();

        List<Course> newCourseList = newIncomingStudent.getPreferredCourses();

        newCourseList.remove(courseOptional.get());
        newIncomingStudent.setPreferredCourses(newCourseList);

        incomingStudentRepository.save(incomingStudentOptional.get());
    }


}
