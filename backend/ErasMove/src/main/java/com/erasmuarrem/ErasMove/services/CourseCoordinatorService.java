package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.CourseCoordinator;
import com.erasmuarrem.ErasMove.repositories.CourseCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseCoordinatorService {

    private final CourseCoordinatorRepository courseCoordinatorRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public CourseCoordinatorService(CourseCoordinatorRepository courseCoordinatorRepository, DepartmentRepository departmentRepository) {
        this.courseCoordinatorRepository = courseCoordinatorRepository;
        this.departmentRepository = departmentRepository;
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
        List<Course> courseList = courseCoordinator.getCourseList();

        for (Course course : courseList) {
            Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository
                    .findByCourseList_ID(course.getID());

            if ( courseCoordinatorOptional.isPresent() ) {
                throw new IllegalStateException("The course with id:" + course.getID() + " already has a course coordinator!");
            }
        }

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

    public List<CourseCoordinator> getCourseCoordinatorsByDepartmentID(Long departmentID) {

        if ( !departmentRepository.existsById(departmentID) ) {
            throw new IllegalStateException("Department with id:" + departmentID + " doesn't exist!");
        }

        return courseCoordinatorRepository.findByDepartmentID(departmentID);
    }
}
