package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.ExchangeUniversity;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.ExchangeUniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeUniversityService {

    private final ExchangeUniversityRepository exchangeUniversityRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public ExchangeUniversityService(ExchangeUniversityRepository exchangeUniversityRepository, CourseRepository courseRepository) {
        this.exchangeUniversityRepository = exchangeUniversityRepository;
        this.courseRepository = courseRepository;
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
            throw new IllegalStateException("Course with id:" + id + " doesn't exist!");
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
            throw new IllegalStateException("Course with id:" + id + " isn't in rejected courses!");
        }

        rejectedCourses.remove(deleteCourse);

        courseRepository.deleteById(courseID);
        exchangeUniversityRepository.save(exchangeUniversity);
    }
}
