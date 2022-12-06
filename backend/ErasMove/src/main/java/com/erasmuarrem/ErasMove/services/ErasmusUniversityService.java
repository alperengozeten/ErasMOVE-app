package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ErasmusUniversity;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.ErasmusUniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ErasmusUniversityService {

    private final ErasmusUniversityRepository erasmusUniversityRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public ErasmusUniversityService(ErasmusUniversityRepository erasmusUniversityRepository, CourseRepository courseRepository) {
        this.erasmusUniversityRepository = erasmusUniversityRepository;
        this.courseRepository = courseRepository;
    }

    public List<ErasmusUniversity> getErasmusUniversities() {
        return erasmusUniversityRepository.findAll();
    }

    public ErasmusUniversity getErasmusUniversityByID(Long id) {
        Optional<ErasmusUniversity> erasmusUniversityOptional = erasmusUniversityRepository.findById(id);

        if ( !erasmusUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with id:" + id + " doesn't exist!");
        }

        return erasmusUniversityOptional.get();
    }

    public ErasmusUniversity getErasmusUniversityByName(String universityName) {
        Optional<ErasmusUniversity> erasmusUniversityOptional = erasmusUniversityRepository.findByUniversityName(universityName);

        if ( !erasmusUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with name:" + universityName + " doesn't exist!");
        }

        return erasmusUniversityOptional.get();
    }

    public void addErasmusUniversity(ErasmusUniversity erasmusUniversity) {
        String universityName = erasmusUniversity.getUniversityName();
        Optional<ErasmusUniversity> erasmusUniversityOptional = erasmusUniversityRepository.findByUniversityName(universityName);

        if ( erasmusUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with name:" + universityName + " already exists!");
        }

        erasmusUniversityRepository.save(erasmusUniversity);

    }

    public void deleteErasmusUniversityByID(Long id) {
        Optional<ErasmusUniversity> erasmusUniversityOptional = erasmusUniversityRepository.findById(id);

        if ( !erasmusUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with id:" + id + " doesn't exist!");
        }

        erasmusUniversityRepository.deleteById(id);
    }

    public List<ErasmusUniversity> getErasmusUniversitiesByCountryName(String countryName) {
        return erasmusUniversityRepository.findByCountry(countryName);
    }

    public void addRejectedCourse(Course course, Long erasmusUniversityID) {
        Optional<ErasmusUniversity> erasmusUniversityOptional = erasmusUniversityRepository.findById(erasmusUniversityID);

        if ( !erasmusUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with id:" + erasmusUniversityID + " doesn't exist!");
        }

        ErasmusUniversity erasmusUniversity = erasmusUniversityOptional.get();

        List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();

        for (Course rejectedCourse : rejectedCourses) {
            if ( rejectedCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Course with name:" + course.getCourseName() + " already rejected for this university!");
            }
        }

        courseRepository.save(course);

        erasmusUniversity.getRejectedCourses().add(course);

        erasmusUniversityRepository.save(erasmusUniversity);
    }

    public void deleteRejectedCourseByIDAndCourseID(Long id, Long courseID) {
        Optional<ErasmusUniversity> erasmusUniversityOptional = erasmusUniversityRepository.findById(id);

        if ( !erasmusUniversityOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(courseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Course with id:" + id + " doesn't exist!");
        }

        ErasmusUniversity erasmusUniversity = erasmusUniversityOptional.get();
        Course deleteCourse = courseOptional.get();
        List<Course> rejectedCourses = erasmusUniversity.getRejectedCourses();
        boolean courseExists = false;

        for (Course rejectedCourse : rejectedCourses) {
            if ( rejectedCourse.getCourseName().equals(deleteCourse.getCourseName()) ) {
                courseExists = true;
                break;
            }
        }

        if ( !courseExists ) {
            throw new IllegalStateException("Course with id:" + id + " isn't in rejected courses!");
        }

        rejectedCourses.remove(deleteCourse);

        courseRepository.deleteById(courseID);
        erasmusUniversityRepository.save(erasmusUniversity);
    }
}
