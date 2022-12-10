package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository, CourseRepository courseRepository) {
        this.departmentRepository = departmentRepository;
        this.courseRepository = courseRepository;
    }

    public List<Department> getDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id: " + id + " doesn't exist!");
        }

        return departmentOptional.get();
    }

    public void addDepartment(Department department) {
        Optional<Department> departmentOptional = departmentRepository.findByDepartmentName(department.getDepartmentName());

        // this check should only be done for the host university, there shouldn't be a check for the
        // erasmusDepartments or exchangeDepartments
        if ( departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with name:" + department.getDepartmentName() + " already exists" +
                    "for the host university!");
        }

        departmentRepository.save(department);
    }

    public Department getDepartmentByCourseId(Long id) {
        Optional<Department> departmentOptional = departmentRepository.findByCourseList_ID(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department containing course with id:" + id + " doesn't exist!");
        }

        return departmentOptional.get();
    }

    public void deleteDepartmentById(Long id) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        departmentRepository.deleteById(id);
    }

    public void addCourseByDepartmentID(Course course, Long id) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        Department department = departmentOptional.get();
        List<Course> courseList = department.getCourseList();

        for (Course departmentCourse : courseList) {
            if ( departmentCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Course with name:" + course.getCourseName() + " already exists in this department!");
            }
        }

        courseList.add(course);
        courseRepository.save(course);
        departmentRepository.save(department);
    }

    public void deleteCourseByDepartmentIDAndCourseID(Long id, Long courseID) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(courseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Course with id:" + courseID + " doesn't exist!");
        }

        Department department = departmentOptional.get();
        List<Course> courseList = department.getCourseList();
        Course course = courseOptional.get();

        if ( !courseList.contains(course) ) {
            throw new IllegalStateException("Course with id:" + courseID + " isn't in the department!");
        }

        courseList.remove(course); // update the list
        courseRepository.deleteById(courseID); // delete the course
        departmentRepository.save(department); // save the department
    }

    public void deleteCourseByDepartmentIDAndCourseName(Long id, String courseName) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        Department department = departmentOptional.get();
        List<Course> courseList = department.getCourseList();
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
            throw new IllegalStateException("Course with name:" + courseName + " doesn't exist in the department!");
        }

        courseList.remove(foundCourse);
        courseRepository.deleteById(foundCourse.getID());
        departmentRepository.save(department);
    }

    public Department getDepartmentByDepartmentName(String departmentName) {
        Optional<Department> departmentOptional = departmentRepository.findByDepartmentName(departmentName);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with department name:" + departmentName + " doesn't exist!");
        }

        return departmentOptional.get();
    }

    public void addElectiveCourseByDepartmentID(Course course, Long id) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        Department department = departmentOptional.get();
        List<Course> electiveCourseList = department.getElectiveCourseList();

        for (Course electiveCourse : electiveCourseList) {
            if ( electiveCourse.getCourseName().equals(course.getCourseName()) ) {
                throw new IllegalStateException("Elective Course with name:" + course.getCourseName() + " already exists in this department!");
            }
        }

        electiveCourseList.add(course);
        courseRepository.save(course);
        departmentRepository.save(department);
    }

    public void deleteElectiveCourseByDepartmentIDAndCourseID(Long id, Long electiveCourseID) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        Optional<Course> courseOptional = courseRepository.findById(electiveCourseID);

        if ( !courseOptional.isPresent() ) {
            throw new IllegalStateException("Elective Course with id:" + electiveCourseID + " doesn't exist!");
        }

        Department department = departmentOptional.get();
        List<Course> electiveCourseList = department.getElectiveCourseList();
        Course electiveCourse = courseOptional.get();

        if ( !electiveCourseList.contains(electiveCourse) ) {
            throw new IllegalStateException("Course with id:" + electiveCourseID + " isn't in the department!");
        }

        electiveCourseList.remove(electiveCourse); // update the list
        courseRepository.deleteById(electiveCourseID); // delete the course from the repository
        departmentRepository.save(department); // save the department
    }
}
