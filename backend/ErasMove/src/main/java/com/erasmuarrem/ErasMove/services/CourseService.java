package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourse(Long id) {
        return courseRepository.findById(id);
    }

    public void addNewCourse(Course course) {
        Optional<Course> courseOptional = courseRepository.findCourseByCourseName(course.getCourseName());

        if ( courseOptional.isPresent() ) {
            throw new IllegalStateException("course exists");
        }

        courseRepository.save(course);
    }

    public String deleteCourse(Long id) {
        String output;
        Optional<Course> courseOptional = courseRepository.findById(id);

        if ( courseOptional.isPresent() ) {
            output = "Course with id " + id + " is deleted!";
        }
        else {
            output = "Course with id " + id + " not found!";
        }
        courseRepository.deleteById(id);

        return output;
    }
}
