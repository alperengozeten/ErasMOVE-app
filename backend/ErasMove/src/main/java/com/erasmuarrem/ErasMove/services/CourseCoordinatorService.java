package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.CourseCoordinator;
import com.erasmuarrem.ErasMove.repositories.CourseCoordinatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseCoordinatorService {

    private final CourseCoordinatorRepository courseCoordinatorRepository;

    @Autowired
    public CourseCoordinatorService(CourseCoordinatorRepository courseCoordinatorRepository) {
        this.courseCoordinatorRepository = courseCoordinatorRepository;
    }

    public List<CourseCoordinator> getCourseCoordinators() {
        return courseCoordinatorRepository.findAll();
    }

    public CourseCoordinator getCourseCoordinatorByID(Long id) {
        Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findById(id);

        if ( !courseCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Course Coordinator with id:" + id + " doesn't exist!");
        }

        return courseCoordinatorOptional.get();
    }

    public void addCourseCoordinator(CourseCoordinator courseCoordinator) {
        courseCoordinatorRepository.save(courseCoordinator);
    }

    public void deleteCourseCoordinatorByID(Long id) {
        Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findById(id);

        if ( !courseCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Course Coordinator with id:" + id + " doesn't exist!");
        }

        courseCoordinatorRepository.deleteById(id);
    }

    public CourseCoordinator getCourseCoordinatorByCourseID(Long id) {
        Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findByCourseList_ID(id);

        return courseCoordinatorOptional.orElse(null);
    }
}
