package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.services.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/initialize")
public class InitializationController {

    private final CourseService courseService;
    private final DepartmentService departmentService;
    private final DepartmentCoordinatorService departmentCoordinatorService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ErasmusUniversityDepartmentService erasmusUniversityDepartmentService;
    private final AdministrativeStaffService administrativeStaffService;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();

    public InitializationController(CourseService courseService, DepartmentService departmentService, DepartmentCoordinatorService departmentCoordinatorService, ErasmusUniversityService erasmusUniversityService, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService, AdministrativeStaffService administrativeStaffService, OutgoingStudentRepository outgoingStudentRepository) {
        this.courseService = courseService;
        this.departmentService = departmentService;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.administrativeStaffService = administrativeStaffService;
        this.outgoingStudentRepository = outgoingStudentRepository;
    }

    @GetMapping
    public String initialize() {

        Course course1 = new Course();
        course1.setCourseName("CS-101");
        course1.setDescription("Algorithms and Programming I");
        course1.setEcts(6.5);
        courseService.addNewCourse(course1);

        Course course2 = new Course();
        course2.setCourseName("CS-102");
        course2.setDescription("Algorithms and Programming II");
        course2.setEcts(6.5);
        courseService.addNewCourse(course2);

        Course course3 = new Course();
        course3.setCourseName("CS-201");
        course3.setDescription("Fundamental Structures of Computer Science I");
        course3.setEcts(5.0);
        courseService.addNewCourse(course3);

        Course course4 = new Course();
        course4.setCourseName("CS-202");
        course4.setDescription("Fundamental Structures of Computer Science II");
        course4.setEcts(5.0);
        courseService.addNewCourse(course4);

        Course course5 = new Course();
        course5.setCourseName("CS-319");
        course5.setDescription("Object-Oriented Software Engineering");
        course5.setEcts(6.5);
        courseService.addNewCourse(course5);

        Course course6 = new Course();
        course6.setCourseName("CS-353");
        course6.setDescription("Database Systems");
        course6.setEcts(5.0);
        courseService.addNewCourse(course6);

        Course course7 = new Course();
        course7.setCourseName("CS-342");
        course7.setDescription("Database Systems");
        course7.setEcts(6.5);
        courseService.addNewCourse(course7);

        // CS ELECTIVES
        Course course8 = new Course();
        course8.setCourseName("ADA-265");
        course8.setDescription("How Houses Build People");
        course8.setEcts(5.0);
        courseService.addNewCourse(course8);

        Course course9 = new Course();
        course9.setCourseName("PSYC-100");
        course9.setDescription("Introduction to Psychology");
        course9.setEcts(5.0);
        courseService.addNewCourse(course9);

        // ADD THE CS DEPARTMENT
        List<Course> csCourseList = new ArrayList<>();
        csCourseList.add(course1);
        csCourseList.add(course2);
        csCourseList.add(course3);
        csCourseList.add(course4);
        csCourseList.add(course5);
        csCourseList.add(course6);
        csCourseList.add(course7);
        List<Course> csElectiveCourseList = new ArrayList<>();
        csElectiveCourseList.add(course8);
        csElectiveCourseList.add(course9);
        Department cs = new Department();
        cs.setDepartmentName("CS");
        cs.setCourseList(csCourseList);
        departmentService.addDepartment(cs);

        // ADD DEPARTMENT COORDINATOR FOR CS
        DepartmentCoordinator csDepartmentCoordinator = new DepartmentCoordinator();
        csDepartmentCoordinator.setName("Can Alkan");
        csDepartmentCoordinator.setEmail("calkan@cs.bilkent.edu.tr");
        csDepartmentCoordinator.setDepartment(cs);
        departmentCoordinatorService.addDepartmentCoordinator(csDepartmentCoordinator);

        // erasmus universities

        // EPFL
        Course erasmusCourse1 = new Course();
        erasmusCourse1.setCourseName("CS-307");
        erasmusCourse1.setDescription("Introduction to multiprocessor architecture");
        erasmusCourse1.setEcts(4.0);
        courseService.addNewCourse(erasmusCourse1);

        Course erasmusCourse2 = new Course();
        erasmusCourse2.setCourseName("CS-323");
        erasmusCourse2.setDescription("Introduction to operating systems");
        erasmusCourse2.setEcts(5.0);
        courseService.addNewCourse(erasmusCourse2);

        ErasmusUniversity epfl = new ErasmusUniversity();
        epfl.setUniversityName("EPFL");
        epfl.setCountry("Switzerland");
        List<Course> epflCourses = new ArrayList<>();
        epflCourses.add(erasmusCourse1);
        epflCourses.add(erasmusCourse2);
        epfl.setRejectedCourses(epflCourses);
        epfl.setAcceptedStudents(new ArrayList<>());
        erasmusUniversityService.addErasmusUniversity(epfl);

        // EPFL CS DEPARTMENT
        ErasmusUniversityDepartment epflCS = new ErasmusUniversityDepartment();
        epflCS.setDepartmentName("CS");
        epflCS.setQuota(2);
        epflCS.setErasmusUniversity(epfl);
        // might add courses later on
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(epflCS);

        // applications
        ApplicationWrapper awp1 = new ApplicationWrapper();
        awp1.setCgpa(3.80);
        awp1.setFirstName("Alperen");
        awp1.setLastName("Gozeten");
        awp1.setSelectedSemester("fall");
        awp1.setStudentId(21902464L);
        awp1.setTotalPoint(99);
        List<String> unis1 = new ArrayList<>();
        unis1.add("EPFL");
        unis1.add("ETH");
        awp1.setSelectedUniversities(unis1);

        ApplicationWrapper awp2 = new ApplicationWrapper();
        awp2.setCgpa(3.90);
        awp2.setFirstName("Kursad");
        awp2.setLastName("Guzelkaya");
        awp2.setSelectedSemester("fall");
        awp2.setStudentId(21902464L);
        awp2.setTotalPoint(98);
        List<String> unis2 = new ArrayList<>();
        unis2.add("ETH");
        awp2.setSelectedUniversities(unis2);

        // Erasmus CS
        List<ApplicationWrapper> applications = new ArrayList<>();
        applications.add(awp1);
        applications.add(awp2);
        administrativeStaffService.addStudents(true, 1L, applications); // CS Applications

        OutgoingStudent student1 = outgoingStudentRepository.findById(2L).get();
        OutgoingStudent student2 = outgoingStudentRepository.findById(3L).get();

        hashingPasswordHelper.setPassword("123");
        student1.setHashedPassword(hashingPasswordHelper.Hash()); // make passwords 123

        hashingPasswordHelper.setPassword("123");
        student2.setHashedPassword(hashingPasswordHelper.Hash());

        erasmusUniversityDepartmentService.addOutgoingStudentByErasmusDepartmentIDAndOutgoingStudentID(
                epflCS.getID(), 2L
        );

        return "Initialized Successfully!";
    }
}
