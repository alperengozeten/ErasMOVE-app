package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.LanguageRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.services.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final ExchangeUniversityService exchangeUniversityService;
    private final ExchangeUniversityDepartmentService exchangeUniversityDepartmentService;
    private final IncomingStudentService incomingStudentService;
    private  final CourseCoordinatorService courseCoordinatorService;
    private final LanguageRepository languageRepository;
    private final AdminService adminService;
    private final HostUniversityService hostUniversityService;
    private final HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();

    @Autowired
    public InitializationController(CourseService courseService, DepartmentService departmentService, DepartmentCoordinatorService departmentCoordinatorService,
                                    ErasmusUniversityService erasmusUniversityService, ErasmusUniversityDepartmentService erasmusUniversityDepartmentService,
                                    AdministrativeStaffService administrativeStaffService, OutgoingStudentRepository outgoingStudentRepository,
                                    ExchangeUniversityService exchangeUniversityService, ExchangeUniversityDepartmentService exchangeUniversityDepartmentService,
                                    IncomingStudentService incomingStudentService, CourseCoordinatorService courseCoordinatorService, LanguageRepository languageRepository,
                                    AdminService adminService, HostUniversityService hostUniversityService) {
        this.courseService = courseService;
        this.departmentService = departmentService;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.erasmusUniversityDepartmentService = erasmusUniversityDepartmentService;
        this.administrativeStaffService = administrativeStaffService;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.exchangeUniversityService = exchangeUniversityService;
        this.exchangeUniversityDepartmentService = exchangeUniversityDepartmentService;
        this.incomingStudentService = incomingStudentService;
        this.courseCoordinatorService = courseCoordinatorService;
        this.languageRepository = languageRepository;
        this.adminService = adminService;
        this.hostUniversityService = hostUniversityService;
    }

    @GetMapping
    public String initialize() {

        //Host University
        HostUniversity BilkentUniv = new HostUniversity();
        BilkentUniv.setWaitingQueue(new ArrayList<>());
        BilkentUniv.setUniversityName("Bilkent University");
        hostUniversityService.addHostUniversity(BilkentUniv);
        //Admin
        Admin admin = new Admin();
        admin.setEmail("korhan@gmail.com");
        hashingPasswordHelper.setPassword("admin");
        admin.setHashedPassword(hashingPasswordHelper.Hash());
        adminService.addAdmin(admin);

        //CS Courses
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
        cs.setElectiveCourseList(csElectiveCourseList);
        departmentService.addDepartment(cs);

        // ADD DEPARTMENT COORDINATOR FOR CS
        DepartmentCoordinator csDepartmentCoordinator = new DepartmentCoordinator();
        csDepartmentCoordinator.setName("Can Alkan");
        csDepartmentCoordinator.setEmail("calkan@cs.bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        csDepartmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
        csDepartmentCoordinator.setDepartment(cs);
        departmentCoordinatorService.addDepartmentCoordinator(csDepartmentCoordinator);

        //MAN Courses
        Course man1 = new Course();
        man1.setCourseName("MAN-101");
        man1.setDescription("Introduction to Management");
        man1.setEcts(6.0);
        courseService.addNewCourse(man1);

        Course man2 = new Course();
        man2.setCourseName("MAN-231");
        man2.setDescription("Accounting Principles");
        man2.setEcts(6.0);
        courseService.addNewCourse(man2);

        Course man3 = new Course();
        man3.setCourseName("MAN-102");
        man3.setDescription("Fundamentals of Management");
        man3.setEcts(5.0);
        courseService.addNewCourse(man3);

        Course man4 = new Course();
        man4.setCourseName("MAN-211");
        man4.setDescription("Financial Management");
        man4.setEcts(4.0);
        courseService.addNewCourse(man4);

        Course man5 = new Course();
        man5.setCourseName("MAN-311");
        man5.setDescription("Assets and Profit");
        man5.setEcts(6.0);
        courseService.addNewCourse(man5);

        Course man6 = new Course();
        man6.setCourseName("MAN-401");
        man6.setDescription("Banks & Accounting");
        man6.setEcts(5.5);
        courseService.addNewCourse(man6);
        //MAN Department
        List<Course> manCourseList = new ArrayList<>();
        manCourseList.add(man1);
        manCourseList.add(man2);
        manCourseList.add(man3);
        manCourseList.add(man4);
        manCourseList.add(man5);
        manCourseList.add(man6);
        List<Course> manElectives = new ArrayList<>();
       // manElectives.add(course8);
       // manElectives.add(course9);

        Department man = new Department();
        man.setDepartmentName("MAN");
        man.setCourseList(manCourseList);
        man.setElectiveCourseList(manElectives);
        departmentService.addDepartment(man);

        //Department Coordinator of Man
        DepartmentCoordinator manDepartmentCoordinator = new DepartmentCoordinator();
        manDepartmentCoordinator.setName("Ceren Aydogmus");
        manDepartmentCoordinator.setEmail("caydogmus@bilkent.edu.tr ");
        hashingPasswordHelper.setPassword("123");
        manDepartmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
        manDepartmentCoordinator.setDepartment(man);
        departmentCoordinatorService.addDepartmentCoordinator(manDepartmentCoordinator);

        // IE DEPARTMENT
        Course ie1 = new Course();
        ie1.setCourseName("IE-102");
        ie1.setDescription("A Process Outlook for Industrial Engineering");
        ie1.setEcts(5.0);
        courseService.addNewCourse(ie1);

        Course ie2 = new Course();
        ie2.setCourseName("IE-272");
        ie2.setDescription("Manufacturing Processes and Operations Analysis");
        ie2.setEcts(6.5);
        courseService.addNewCourse(ie2);

        Course ie3 = new Course();
        ie3.setCourseName("IE-202");
        ie3.setDescription("Introduction to Modeling and Optimization");
        ie3.setEcts(6.5);
        courseService.addNewCourse(ie3);

        Course ie4 = new Course();
        ie4.setCourseName("IE-342");
        ie4.setDescription("Engineering Economic Analysis");
        ie4.setEcts(5.0);
        courseService.addNewCourse(ie4);

        Course ie5 = new Course();
        ie5.setCourseName("IE-324");
        ie5.setDescription("Simulation");
        ie5.setEcts(6.5);
        courseService.addNewCourse(ie5);

        Course ie6 = new Course();
        ie6.setCourseName("IE-303");
        ie6.setDescription("Modeling and Methods in Optimization");
        ie6.setEcts(5.0);
        courseService.addNewCourse(ie6);

        Course ie7 = new Course();
        ie7.setCourseName("IE-325");
        ie7.setDescription("Stochastic Models");
        ie7.setEcts(5.0);
        courseService.addNewCourse(ie7);

        // IE ELECTIVES
        Course ieEl1 = new Course();
        ieEl1.setCourseName("ADA-265");
        ieEl1.setDescription("How Houses Build People");
        ieEl1.setEcts(5.0);
        courseService.addNewCourse(ieEl1);

        Course ieEl2 = new Course();
        ieEl2.setCourseName("PSYC-100");
        ieEl2.setDescription("Introduction to Psychology");
        ieEl2.setEcts(5.0);
        courseService.addNewCourse(ieEl2);

        // add the ie courses
        List<Course> ieCourseList = new ArrayList<>();
        ieCourseList.add(ie1);
        ieCourseList.add(ie2);
        ieCourseList.add(ie3);
        ieCourseList.add(ie4);
        ieCourseList.add(ie5);
        ieCourseList.add(ie6);
        ieCourseList.add(ie7);
        List<Course> ieElectiveCourseList = new ArrayList<>();
        ieElectiveCourseList.add(ieEl1);
        ieElectiveCourseList.add(ieEl2);

        // ADD THE IE DEPARTMENT
        Department ie = new Department();
        ie.setDepartmentName("IE");
        ie.setCourseList(ieCourseList);
        ie.setElectiveCourseList(ieElectiveCourseList);
        departmentService.addDepartment(ie);

        // ADD DEPARTMENT COORDINATOR FOR IE
        DepartmentCoordinator ieDepartmentCoordinator = new DepartmentCoordinator();
        ieDepartmentCoordinator.setName("Emre Uzun");
        ieDepartmentCoordinator.setEmail("emreu@bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        ieDepartmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
        ieDepartmentCoordinator.setDepartment(ie);
        departmentCoordinatorService.addDepartmentCoordinator(ieDepartmentCoordinator);

        // EEE courses
        Course eee1 = new Course();
        eee1.setCourseName("EEE-102");
        eee1.setDescription("Introduction to Digital Circuit Design");
        eee1.setEcts(6.5);
        courseService.addNewCourse(eee1);

        Course eee2 = new Course();
        eee2.setCourseName("EEE-211");
        eee2.setDescription("Analog Electronics");
        eee2.setEcts(6.5);
        courseService.addNewCourse(eee2);

        Course eee3 = new Course();
        eee3.setCourseName("MATH-241");
        eee3.setDescription("Engineering Mathematics I");
        eee3.setEcts(6.5);
        courseService.addNewCourse(eee3);

        Course eee4 = new Course();
        eee4.setCourseName("EEE-202");
        eee4.setDescription("Circuit Theory");
        eee4.setEcts(6.5);
        courseService.addNewCourse(eee4);

        Course eee5 = new Course();
        eee5.setCourseName("EEE-212");
        eee5.setDescription("Microprocessors");
        eee5.setEcts(6.5);
        courseService.addNewCourse(eee5);

        Course eee6 = new Course();
        eee6.setCourseName("MATH-242");
        eee6.setDescription("Engineering Mathematics II");
        eee6.setEcts(6.5);
        courseService.addNewCourse(eee6);

        Course eee7 = new Course();
        eee7.setCourseName("EEE-313");
        eee7.setDescription("Electronic Circuit Design");
        eee7.setEcts(6.5);
        courseService.addNewCourse(eee7);

        Course eee8 = new Course();
        eee8.setCourseName("EEE-351");
        eee8.setDescription("Engineering Electromagnetics");
        eee8.setEcts(5.0);
        courseService.addNewCourse(eee8);

        // EEE ELECTIVES
        Course eeeEl1 = new Course();
        eeeEl1.setCourseName("ADA-265");
        eeeEl1.setDescription("How Houses Build People");
        eeeEl1.setEcts(5.0);
        courseService.addNewCourse(eeeEl1);

        Course eeeEl2 = new Course();
        eeeEl2.setCourseName("PSYC-100");
        eeeEl2.setDescription("Introduction to Psychology");
        eeeEl2.setEcts(5.0);
        courseService.addNewCourse(eeeEl2);

        // ADD THE EEE COURSES
        List<Course> eeeCourseList = new ArrayList<>();
        eeeCourseList.add(eee1);
        eeeCourseList.add(eee2);
        eeeCourseList.add(eee3);
        eeeCourseList.add(eee4);
        eeeCourseList.add(eee5);
        eeeCourseList.add(eee6);
        eeeCourseList.add(eee7);
        eeeCourseList.add(eee8);
        List<Course> eeeElectiveCourseList = new ArrayList<>();
        eeeElectiveCourseList.add(eeeEl1);
        eeeElectiveCourseList.add(eeeEl2);

        // ADD THE EEE DEPARTMENT
        Department eee = new Department();
        eee.setDepartmentName("EEE");
        eee.setCourseList(eeeCourseList);
        eee.setElectiveCourseList(eeeElectiveCourseList);
        departmentService.addDepartment(eee);

        // ADD DEPARTMENT COORDINATOR FOR EEE
        DepartmentCoordinator eeeDepartmentCoordinator = new DepartmentCoordinator();
        eeeDepartmentCoordinator.setName("Tolga Çukur");
        eeeDepartmentCoordinator.setEmail("cukur@ee.bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        eeeDepartmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
        eeeDepartmentCoordinator.setDepartment(eee);
        departmentCoordinatorService.addDepartmentCoordinator(eeeDepartmentCoordinator);

        // ME courses
        Course me1 = new Course();
        me1.setCourseName("ME-102");
        me1.setDescription("Introduction to Systems Engineering");
        me1.setEcts(5.0);
        courseService.addNewCourse(me1);

        Course me2 = new Course();
        me2.setCourseName("ME-211");
        me2.setDescription("Thermo-Fluids Engineering I");
        me2.setEcts(6.5);
        courseService.addNewCourse(me2);

        Course me3 = new Course();
        me3.setCourseName("ME-231");
        me3.setDescription("Mechanics and Materials I");
        me3.setEcts(6.5);
        courseService.addNewCourse(me3);

        Course me4 = new Course();
        me4.setCourseName("ME-212");
        me4.setDescription("Thermo-Fluids Engineering II");
        me4.setEcts(6.5);
        courseService.addNewCourse(me4);

        Course me5 = new Course();
        me5.setCourseName("ME-232");
        me5.setDescription("Mechanics and Materials II");
        me5.setEcts(6.5);
        courseService.addNewCourse(me5);

        Course me6 = new Course();
        me6.setCourseName("ME-341");
        me6.setDescription("Dynamics and Control I");
        me6.setEcts(6.5);
        courseService.addNewCourse(me6);

        Course me7 = new Course();
        me7.setCourseName("ME-342");
        me7.setDescription("Dynamics and Control II");
        me7.setEcts(6.5);
        courseService.addNewCourse(me7);

        Course me8 = new Course();
        me8.setCourseName("ME-381");
        me8.setDescription("Design and Manufacturing");
        me8.setEcts(6.5);
        courseService.addNewCourse(me8);

        // ME ELECTIVES
        Course meEl1 = new Course();
        meEl1.setCourseName("ADA-265");
        meEl1.setDescription("How Houses Build People");
        meEl1.setEcts(5.0);
        courseService.addNewCourse(meEl1);

        Course meEl2 = new Course();
        meEl2.setCourseName("PSYC-100");
        meEl2.setDescription("Introduction to Psychology");
        meEl2.setEcts(5.0);
        courseService.addNewCourse(meEl2);

        // ADD THE ME COURSES
        List<Course> meCourseList = new ArrayList<>();
        meCourseList.add(me1);
        meCourseList.add(me2);
        meCourseList.add(me3);
        meCourseList.add(me4);
        meCourseList.add(me5);
        meCourseList.add(me6);
        meCourseList.add(me7);
        meCourseList.add(me8);

        List<Course> meElectiveCourseList = new ArrayList<>();
        meElectiveCourseList.add(meEl1);
        meElectiveCourseList.add(meEl2);

        // ADD THE ME DEPARTMENT
        Department me = new Department();
        me.setDepartmentName("ME");
        me.setCourseList(meCourseList);
        me.setElectiveCourseList(meElectiveCourseList);
        departmentService.addDepartment(me);

        // ADD DEPARTMENT COORDINATOR FOR ME
        DepartmentCoordinator meDepartmentCoordinator = new DepartmentCoordinator();
        meDepartmentCoordinator.setName("Gökberk Kabacaoğlu");
        meDepartmentCoordinator.setEmail("gkabacaoglu@bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        meDepartmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
        meDepartmentCoordinator.setDepartment(me);
        departmentCoordinatorService.addDepartmentCoordinator(meDepartmentCoordinator);

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
        epflCS.setQuota(3);
        epflCS.setMaxQuota(3);
        epflCS.setErasmusUniversity(epfl);

        Course epflCS1 = new Course();
        epflCS1.setCourseName("CS-231");
        epflCS1.setDescription("Computer Organization");
        epflCS1.setEcts(7.0);

        Course epflCS2 = new Course();
        epflCS2.setCourseName("CS-312");
        epflCS2.setDescription("Automata Theory and Formal Languages");
        epflCS2.setEcts(6.0);

        Course epflCS3 = new Course();
        epflCS3.setCourseName("CS-331");
        epflCS3.setDescription("Computer Architecture");
        epflCS3.setEcts(8.0);

        Course epflCS4 = new Course();
        epflCS4.setCourseName("CS-400");
        epflCS4.setDescription("Senior Project");
        epflCS4.setEcts(9.0);

        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(epflCS);
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflCS1, epflCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflCS2, epflCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflCS3, epflCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflCS4, epflCS.getID());

        //EPFL IE DEP
        ErasmusUniversityDepartment epflIE = new ErasmusUniversityDepartment();
        epflIE.setDepartmentName("IE");
        epflIE.setQuota(5);
        epflIE.setMaxQuota(5);
        epflIE.setErasmusUniversity(epfl);

        Course epflIE1 = new Course();
        epflIE1.setCourseName("IE-131");
        epflIE1.setDescription("Modeling and Organization");
        epflIE1.setEcts(7.0);

        Course epflIE2 = new Course();
        epflIE2.setCourseName("IE-300");
        epflIE2.setDescription("Optimization Theory");
        epflIE2.setEcts(6.0);

        Course epflIE3 = new Course();
        epflIE3.setCourseName("IE-231");
        epflIE3.setDescription("Industrial Architecture");
        epflIE3.setEcts(8.0);

        Course epflIE4 = new Course();
        epflIE4.setCourseName("IE-400");
        epflIE4.setDescription("Senior Project");
        epflIE4.setEcts(9.0);

        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(epflIE);
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflIE1, epflIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflIE2, epflIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflIE3, epflIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( epflIE4, epflIE.getID());

        //ETH
        Course ethCS1  = new Course();
        ethCS1.setCourseName("CS-101");
        ethCS1.setDescription("Introduction to Programming");
        ethCS1.setEcts(6.0);
        courseService.addNewCourse(ethCS1);

        Course ethCS2  = new Course();
        ethCS2.setCourseName("CS-102");
        ethCS2.setDescription("Programming and Algorithms");
        ethCS2.setEcts(6.0);
        courseService.addNewCourse(ethCS2);


        Course ethCS3 = new Course();
        ethCS3.setCourseName("CS-461");
        ethCS3.setDescription("Computer Vision");
        ethCS3.setEcts(5.5);
        courseService.addNewCourse(ethCS3);

        ErasmusUniversity eth = new ErasmusUniversity();
        eth.setUniversityName("ETH");
        eth.setCountry("Switzerland");
        List<Course> ethCourses = new ArrayList<>();
        ethCourses.add(ethCS1);
        ethCourses.add(ethCS2);
        ethCourses.add(ethCS3);
        eth.setRejectedCourses(ethCourses);
        eth.setAcceptedStudents(new ArrayList<>());
        erasmusUniversityService.addErasmusUniversity(eth);

        ErasmusUniversityDepartment ethCS = new ErasmusUniversityDepartment();
        ethCS.setQuota(2);
        ethCS.setErasmusUniversity(eth);
        ethCS.setDepartmentName("CS");
        ethCS.setMaxQuota(2);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(ethCS);

        Course ethCS4 = new Course();
        ethCS4.setCourseName("CS-331");
        ethCS4.setDescription("Computer Networks");
        ethCS4.setEcts(5.5);

        Course ethCS5 = new Course();
        ethCS5.setCourseName("CS-400");
        ethCS5.setDescription("Automata Theory and Turing Machines");
        ethCS5.setEcts(5.0);

        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( ethCS4,ethCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( ethCS5,ethCS.getID());
        //ETH IE DEP
        ErasmusUniversityDepartment ethIE = new ErasmusUniversityDepartment();
        ethIE.setDepartmentName("IE");
        ethIE.setQuota(5);
        ethIE.setMaxQuota(5);
        ethIE.setErasmusUniversity(eth);

        Course ethIE1 = new Course();
        ethIE1.setCourseName("IE-131");
        ethIE1.setDescription("Modeling and Organization");
        ethIE1.setEcts(7.0);

        Course ethIE2 = new Course();
        ethIE2.setCourseName("IE-300");
        ethIE2.setDescription("Optimization Theory");
        ethIE2.setEcts(6.0);

        Course ethIE3 = new Course();
        ethIE3.setCourseName("IE-231");
        ethIE3.setDescription("Industrial Architecture");
        ethIE3.setEcts(8.0);

        Course ethIE4 = new Course();
        ethIE4.setCourseName("IE-400");
        ethIE4.setDescription("Senior Project");
        ethIE4.setEcts(9.0);

        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(ethIE);
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( ethIE4, ethIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( ethIE3, ethIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( ethIE2, ethIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( ethIE1, ethIE.getID());

        //Vrije
        Course vrijeCS1  = new Course();
        vrijeCS1.setCourseName("CS-101");
        vrijeCS1.setDescription("Introduction to Programming");
        vrijeCS1.setEcts(6.0);

        Course vrijeCS2 = new Course();
        vrijeCS2.setCourseName("CS-102");
        vrijeCS2.setDescription("Algorithms");
        vrijeCS2.setEcts(6.0);
        courseService.addNewCourse(vrijeCS2);


        Course vrijeCS3 = new Course();
        vrijeCS3.setCourseName("CS-461");
        vrijeCS3.setDescription("Machine Learning");
        vrijeCS3.setEcts(5.5);
        courseService.addNewCourse(vrijeCS3);

        ErasmusUniversity vrije = new ErasmusUniversity();
        vrije.setUniversityName("Vrije");
        vrije.setCountry("Holland");
        List<Course> vrijeCourses = new ArrayList<>();
        vrijeCourses.add(vrijeCS2);
        vrijeCourses.add(vrijeCS3);
        vrije.setRejectedCourses(vrijeCourses);
        eth.setAcceptedStudents(new ArrayList<>());
        erasmusUniversityService.addErasmusUniversity(vrije);

        ErasmusUniversityDepartment vrijeCS = new ErasmusUniversityDepartment();
        vrijeCS.setQuota(3);
        vrijeCS.setErasmusUniversity(vrije);
        vrijeCS.setDepartmentName("CS");
        vrijeCS.setMaxQuota(3);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(vrijeCS);

        Course vrijeCS4 = new Course();
        vrijeCS4.setCourseName("CS-331");
        vrijeCS4.setDescription("Computer Architecture");
        vrijeCS4.setEcts(5.5);

        Course vrijeCS5 = new Course();
        vrijeCS5.setCourseName("CS-400");
        vrijeCS5.setDescription("Data Structures");
        vrijeCS5.setEcts(5.0);

        Course vrijeCS6 = new Course();
        vrijeCS6.setCourseName("CS-105");
        vrijeCS6.setDescription("Python for Beginners");
        vrijeCS6.setEcts(5.0);

        Course vrijeCS7 = new Course();
        vrijeCS7.setCourseName("CS-400");
        vrijeCS7.setDescription("Data Engineering for Social Sciences");
        vrijeCS7.setEcts(3.5);

        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(vrijeCS1, vrijeCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( vrijeCS4,vrijeCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( vrijeCS5,vrijeCS.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( vrijeCS7, vrijeCS.getID() );
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( vrijeCS6, vrijeCS.getID() );

        //Vrije IE DEP
        ErasmusUniversityDepartment vrIE = new ErasmusUniversityDepartment();
        vrIE.setDepartmentName("IE");
        vrIE.setQuota(5);
        vrIE.setMaxQuota(5);
        vrIE.setErasmusUniversity(vrije);

        Course vrIE1 = new Course();
        vrIE1.setCourseName("IE-131");
        vrIE1.setDescription("Modeling and Organization");
        vrIE1.setEcts(7.0);

        Course vrIE2 = new Course();
        vrIE2.setCourseName("IE-300");
        vrIE2.setDescription("Optimization Theory");
        vrIE2.setEcts(6.0);

        Course vrIE3 = new Course();
        vrIE3.setCourseName("IE-231");
        vrIE3.setDescription("Industrial Architecture");
        vrIE3.setEcts(8.0);

        Course vrIE4 = new Course();
        vrIE4.setCourseName("IE-400");
        vrIE4.setDescription("Senior Project");
        vrIE4.setEcts(9.0);

        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(vrIE);
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( vrIE4, vrIE.getID() );
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( vrIE1, vrIE.getID() );
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( vrIE2, vrIE.getID() );
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( vrIE3, vrIE.getID() );


        //Roskilde University
        Course roskCS1  = new Course();
        roskCS1.setCourseName("CS-101");
        roskCS1.setDescription("How to Be a Programmer");
        roskCS1.setEcts(6.0);

        Course roskCS2 = new Course();
        roskCS2.setCourseName("CS-102");
        roskCS2.setDescription("Algorithms of Life");
        roskCS2.setEcts(6.0);
        courseService.addNewCourse(roskCS2);


        Course roskCS3 = new Course();
        roskCS3.setCourseName("CS-461");
        roskCS3.setDescription("Deep Learning");
        roskCS3.setEcts(5.5);
        courseService.addNewCourse(roskCS3);

        ErasmusUniversity roskilde = new ErasmusUniversity();
        roskilde.setUniversityName("Roskilde");
        roskilde.setCountry("Denmark");
        Language Danish = new Language();
        Danish.setLanguage("Danish");
        Danish.setLevel("B2");
        languageRepository.save(Danish);
        roskilde.setLanguageRequirement(Danish);
        List<Course> roskildeCourses = new ArrayList<>();
        roskildeCourses.add(roskCS2);
        roskildeCourses.add(roskCS3);
        roskilde.setRejectedCourses(roskildeCourses);
        roskilde.setAcceptedStudents(new ArrayList<>());
        erasmusUniversityService.addErasmusUniversity(roskilde);
        //Roskilde CS
        ErasmusUniversityDepartment roskCS = new ErasmusUniversityDepartment();
        roskCS.setQuota(4);
        roskCS.setErasmusUniversity(roskilde);
        roskCS.setDepartmentName("CS");
        roskCS.setMaxQuota(4);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(roskCS);

        Course roskCS4 = new Course();
        roskCS4.setCourseName("CS-331");
        roskCS4.setDescription("Computer Architecture");
        roskCS4.setEcts(5.5);

        Course roskCS5 = new Course();
        roskCS5.setCourseName("CS-400");
        roskCS5.setDescription("Data Structures");
        roskCS5.setEcts(5.0);

        Course roskCS6 = new Course();
        roskCS6.setCourseName("CS-105");
        roskCS6.setDescription("Python for Beginners");
        roskCS6.setEcts(5.0);

        Course roskCS7 = new Course();
        roskCS7.setCourseName("CS-400");
        roskCS7.setDescription("Data Engineering for Social Sciences");
        roskCS7.setEcts(3.5);

        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(roskCS1, roskCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( roskCS4,roskCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( roskCS5,roskCS.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( roskCS7, roskCS.getID() );
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( roskCS6, roskCS.getID() );

        //Roskilde IE
        ErasmusUniversityDepartment roskIE = new ErasmusUniversityDepartment();
        roskIE.setQuota(4);
        roskIE.setErasmusUniversity(roskilde);
        roskIE.setDepartmentName("IE");
        roskIE.setMaxQuota(4);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(roskIE);

        Course roskIE1 = new Course();
        roskIE1.setCourseName("IE-331");
        roskIE1.setDescription("Industrial Architecture");
        roskIE1.setEcts(5.5);

        Course roskIE2 = new Course();
        roskIE2.setCourseName("IE-400");
        roskIE2.setDescription("Data Optimization");
        roskIE2.setEcts(5.0);

        Course roskIE3 = new Course();
        roskIE3.setCourseName("IE-105");
        roskIE3.setDescription("Excel for Beginners");
        roskIE3.setEcts(5.0);

        Course roskIE4 = new Course();
        roskIE4.setCourseName("IE-440");
        roskIE4.setDescription("Data Science");
        roskIE4.setEcts(3.5);

        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(roskIE3, roskIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( roskIE4,roskIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( roskIE1,roskIE.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( roskIE2, roskIE.getID() );

        //Dortmund University
        Course dortCS1  = new Course();
        dortCS1.setCourseName("CS-100");
        dortCS1.setDescription("Programming");
        dortCS1.setEcts(6.0);

        Course dortCS2 = new Course();
        dortCS2.setCourseName("CS-102");
        dortCS2.setDescription("Algorithms");
        dortCS2.setEcts(6.0);


        Course dortCS3 = new Course();
        dortCS3.setCourseName("CS-461");
        dortCS3.setDescription("Operating Systems");
        dortCS3.setEcts(5.5);
        courseService.addNewCourse(dortCS3);

        ErasmusUniversity dortmund = new ErasmusUniversity();
        dortmund.setUniversityName("Dortmund");
        dortmund.setCountry("Germany");
        Language German = new Language();
        German.setLanguage("German");
        German.setLevel("B1");
        languageRepository.save(German);
        dortmund.setLanguageRequirement(German);
        List<Course> dortCourses = new ArrayList<>();
        dortCourses.add(dortCS3);
        dortmund.setRejectedCourses(dortCourses);
        dortmund.setAcceptedStudents(new ArrayList<>());
        erasmusUniversityService.addErasmusUniversity(dortmund);
        //Dortmund CS
        ErasmusUniversityDepartment dortCS = new ErasmusUniversityDepartment();
        dortCS.setQuota(4);
        dortCS.setErasmusUniversity(dortmund);
        dortCS.setDepartmentName("CS");
        dortCS.setMaxQuota(4);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(dortCS);

        Course dortCS4 = new Course();
        dortCS4.setCourseName("CS-331");
        dortCS4.setDescription("Programming Languages");
        dortCS4.setEcts(5.5);

        Course dortCS5 = new Course();
        dortCS5.setCourseName("CS-403");
        dortCS5.setDescription("Data Structures");
        dortCS5.setEcts(5.0);


        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(dortCS1, dortCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( dortCS2,dortCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( dortCS4,dortCS.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( dortCS5, dortCS.getID() );

        //Dort IE
        ErasmusUniversityDepartment dortIE = new ErasmusUniversityDepartment();
        dortIE.setQuota(4);
        dortIE.setErasmusUniversity(dortmund);
        dortIE.setDepartmentName("IE");
        dortIE.setMaxQuota(4);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(dortIE);

        Course dortIE1 = new Course();
        dortIE1.setCourseName("IE-331");
        dortIE1.setDescription("Industrial Architecture");
        dortIE1.setEcts(5.5);

        Course dortIE2 = new Course();
        dortIE2.setCourseName("IE-400");
        dortIE2.setDescription("Data Optimization");
        dortIE2.setEcts(5.0);

        Course dortIE3 = new Course();
        dortIE3.setCourseName("IE-105");
        dortIE3.setDescription("Excel for Beginners");
        dortIE3.setEcts(5.0);

        Course dortIE4 = new Course();
        dortIE4.setCourseName("IE-440");
        dortIE4.setDescription("Data Science");
        dortIE4.setEcts(3.5);

        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(dortIE1, dortIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( dortIE2, dortIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( dortIE3, dortIE.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( dortIE4,  dortIE.getID() );

        //Kingston University
        Course kingCS1  = new Course();
        kingCS1.setCourseName("CS-100");
        kingCS1.setDescription("Programming");
        kingCS1.setEcts(6.0);

        Course kingCS2 = new Course();
        kingCS2.setCourseName("CS-102");
        kingCS2.setDescription("Algorithms");
        kingCS2.setEcts(6.0);
        courseService.addNewCourse(kingCS2);



        Course kingCS3 = new Course();
        kingCS3.setCourseName("CS-461");
        kingCS3.setDescription("Operating Systems");
        kingCS3.setEcts(5.5);

        ErasmusUniversity kingston = new ErasmusUniversity();
        kingston.setUniversityName("Kingston");
        kingston.setCountry("England");

        List<Course> kingCourses = new ArrayList<>();
        kingCourses.add(kingCS2);
        kingston.setRejectedCourses(kingCourses);
        kingston.setAcceptedStudents(new ArrayList<>());
        erasmusUniversityService.addErasmusUniversity(kingston);
        //Kingston CS
        ErasmusUniversityDepartment kingstonCS = new ErasmusUniversityDepartment();
        kingstonCS.setQuota(4);
        kingstonCS.setErasmusUniversity(kingston);
        kingstonCS.setDepartmentName("CS");
        kingstonCS.setMaxQuota(4);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(kingstonCS);

        Course kingstonCS4 = new Course();
        kingstonCS4.setCourseName("CS-331");
        kingstonCS4.setDescription("Programming Languages");
        kingstonCS4.setEcts(5.5);

        Course kingstonCS5 = new Course();
        kingstonCS5.setCourseName("CS-403");
        kingstonCS5.setDescription("Data Structures");
        kingstonCS5.setEcts(5.0);


        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(kingCS3, kingstonCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( kingCS1, kingstonCS.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( kingstonCS4,kingstonCS.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( kingstonCS5, kingstonCS.getID());

        //Kıngston IE
        ErasmusUniversityDepartment kingIE = new ErasmusUniversityDepartment();
        kingIE.setQuota(4);
        kingIE.setErasmusUniversity(kingston);
        kingIE.setDepartmentName("IE");
        kingIE.setMaxQuota(4);
        erasmusUniversityDepartmentService.addErasmusUniversityDepartment(kingIE);

        Course kingIE1 = new Course();
        kingIE1.setCourseName("IE-331");
        kingIE1.setDescription("Industrial Architecture");
        kingIE1.setEcts(5.5);

        Course kingIE2 = new Course();
        kingIE2.setCourseName("IE-400");
        kingIE2.setDescription("Data Optimization");
        kingIE2.setEcts(5.0);

        Course kingIE3 = new Course();
        kingIE3.setCourseName("IE-105");
        kingIE3.setDescription("Excel for Beginners");
        kingIE3.setEcts(5.0);

        Course kingIE4 = new Course();
        kingIE4.setCourseName("IE-440");
        kingIE4.setDescription("Data Science");
        kingIE4.setEcts(3.5);

        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID(kingIE2, kingIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( kingIE3, kingIE.getID());
        erasmusUniversityDepartmentService.addCourseByErasmusDepartmentID( kingIE1, kingIE.getID());
        erasmusUniversityDepartmentService.addElectiveCourseByErasmusDepartmentID( kingIE4,  kingIE.getID() );



        //Exchange University
        //Queen's Univ
        ExchangeUniversity queens = new ExchangeUniversity();
        queens.setCountry("Canada");
        queens.setUniversityName("Queen's");
        queens.setMaxUniversityQuota(4);
        queens.setUniversityQuota(4);
        queens.setAcceptedStudents(new ArrayList<>() );

        Course rejectQueen1 = new Course();
        rejectQueen1.setEcts(5.0);
        rejectQueen1.setCourseName("IE-202");
        rejectQueen1.setDescription("Optimization");
        courseService.addNewCourse(rejectQueen1);


        Course rejectQueen2 = new Course();
        rejectQueen2.setEcts(3.0);
        rejectQueen2.setCourseName("IE-303");
        rejectQueen2.setDescription("Stochastic Models");
        courseService.addNewCourse(rejectQueen2);

        List<Course> rejectedQueen = new ArrayList<>();
        rejectedQueen.add(rejectQueen1);
        rejectedQueen.add(rejectQueen2);

        queens.setRejectedCourses(rejectedQueen);
        exchangeUniversityService.addExchangeUniversity(queens);

        ExchangeUniversityDepartment queensIE = new ExchangeUniversityDepartment();
        queensIE.setDepartmentName("IE");
        queensIE.setExchangeUniversity(queens);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(queensIE);

        Course acceptedQueen1 = new Course();
        acceptedQueen1.setEcts(4.5);
        acceptedQueen1.setCourseName("IE-410");
        acceptedQueen1.setDescription("Game Theory");

        Course acceptedQueen2 = new Course();
        acceptedQueen2.setEcts(5.0);
        acceptedQueen2.setCourseName("IE-341");
        acceptedQueen2.setDescription("Industrial Revolution");


        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedQueen1,queensIE.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedQueen2,queensIE.getID());

        //Seoul University
        ExchangeUniversity seoul = new ExchangeUniversity();
        seoul.setCountry("South Korea");
        seoul.setUniversityName("Seoul");
        seoul.setUniversityQuota(7);
        seoul.setMaxUniversityQuota(7);
        seoul.setAcceptedStudents(new ArrayList<>());
        Language Korean = new Language();

        Korean.setLanguage("Korean");
        Korean.setLevel("B1");
        languageRepository.save(Korean);

        seoul.setLanguageRequirement(Korean);

        Course rejectSeoul1 = new Course();
        rejectSeoul1.setEcts(6.0);
        rejectSeoul1.setCourseName("ME-101");
        rejectSeoul1.setDescription("Introduction to Machines");
        courseService.addNewCourse(rejectSeoul1);

        Course rejectSeoul2 = new Course();
        rejectSeoul2.setEcts(6.0);
        rejectSeoul2.setCourseName("ME-311");
        rejectSeoul2.setDescription("Fluid Things");
        courseService.addNewCourse(rejectSeoul2);

        List<Course> rejectedSeoul = new ArrayList<>();
        rejectedSeoul.add(rejectSeoul1);
        rejectedSeoul.add(rejectSeoul2);
        seoul.setRejectedCourses(rejectedSeoul);


        exchangeUniversityService.addExchangeUniversity(seoul);
        exchangeUniversityService.addLanguageRequirementToExchangeUniversityByExchangeUniversityID(seoul.getID(), Korean);

        ExchangeUniversityDepartment seoulME = new ExchangeUniversityDepartment();
        seoulME.setDepartmentName("ME");
        seoulME.setExchangeUniversity(seoul);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(seoulME);

        ExchangeUniversityDepartment seoulEEE = new ExchangeUniversityDepartment();
        seoulEEE.setDepartmentName("EEE");
        seoulEEE.setExchangeUniversity(seoul);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(seoulEEE);


        Course seoulME1 = new Course();
        seoulME1.setEcts(4.5);
        seoulME1.setCourseName("ME-303");
        seoulME1.setDescription("Robotics");

        Course seoulME2 = new Course();
        seoulME2.setEcts(5.5);
        seoulME2.setCourseName("ME-444");
        seoulME2.setDescription("Humandroids");

        Course seoulEEE1 = new Course();
        seoulEEE1.setEcts(4.5);
        seoulEEE1.setCourseName("EEE-102");
        seoulEEE1.setDescription("Analog Circuits");

        Course seoulEEE2 = new Course();
        seoulEEE2.setEcts(5.0);
        seoulEEE2.setCourseName("EEE-312");
        seoulEEE2.setDescription("Signals and Systems");


        Course seoulEEE3 = new Course();
        seoulEEE3.setEcts(5.0);
        seoulEEE3.setCourseName("EEE-391");
        seoulEEE3.setDescription("Signals and Systems for Computer Scientists");


        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(seoulME1,seoulME.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(seoulME2,seoulME.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(seoulEEE1,seoulEEE.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(seoulEEE2,seoulEEE.getID());
        exchangeUniversityDepartmentService.addElectiveCourseByExchangeDepartmentID(seoulEEE3, seoulEEE.getID());
        //Austin Texas at University
        ExchangeUniversity austin = new ExchangeUniversity();
        austin.setCountry("America");
        austin.setUniversityName("Austin Texas");
        austin.setMaxUniversityQuota(25);
        austin.setUniversityQuota(25);
        austin.setAcceptedStudents(new ArrayList<>() );

        Course rejectAus1 = new Course();
        rejectAus1.setEcts(8.0);
        rejectAus1.setCourseName("IE-333");
        rejectAus1.setDescription("Optimization of Machines");
        courseService.addNewCourse(rejectAus1);


        Course rejectAus2 = new Course();
        rejectAus2.setEcts(9.0);
        rejectAus2.setCourseName("IE-101");
        rejectAus2.setDescription("Introduction to Industrial Thinking");
        courseService.addNewCourse(rejectAus2);

        List<Course> rejectedAustin = new ArrayList<>();
        rejectedAustin.add(rejectAus2);
        rejectedQueen.add(rejectAus1);

        austin.setRejectedCourses(rejectedAustin);
        exchangeUniversityService.addExchangeUniversity(austin);

        ExchangeUniversityDepartment austinIE = new ExchangeUniversityDepartment();
        austinIE.setDepartmentName("IE");
        austinIE.setExchangeUniversity(austin);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(austinIE);

        ExchangeUniversityDepartment austinCS = new ExchangeUniversityDepartment();
        austinCS.setDepartmentName("CS");
        austinCS.setExchangeUniversity(austin);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(austinCS);



        Course acceptedAustin1 = new Course();
        acceptedAustin1.setEcts(15.0);
        acceptedAustin1.setCourseName("IE-410");
        acceptedAustin1.setDescription("Gaming Industry");

        Course acceptedAustin2 = new Course();
        acceptedAustin2.setEcts(16.0);
        acceptedAustin2.setCourseName("IE-341");
        acceptedAustin2.setDescription("Industry 4.0");


        Course acceptedAustin3 = new Course();
        acceptedAustin3.setEcts(8.0);
        acceptedAustin3.setCourseName("CS-410");
        acceptedAustin3.setDescription("Object Oriented Programming");

        Course acceptedAustin4 = new Course();
        acceptedAustin4.setEcts(9.0);
        acceptedAustin4.setCourseName("CS-341");
        acceptedAustin4.setDescription("Operating Systems");

        Course acceptedAustin5 = new Course();
        acceptedAustin5.setEcts(11.0);
        acceptedAustin5.setCourseName("CS-281");
        acceptedAustin5.setDescription("Database Systems");

        Course acceptedAustin6 = new Course();
        acceptedAustin6.setEcts(8.0);
        acceptedAustin6.setCourseName("CS-121");
        acceptedAustin6.setDescription("Word, Excel and More");

        Course acceptedAustin7 = new Course();
        acceptedAustin7.setEcts(8.0);
        acceptedAustin7.setCourseName("CS-131");
        acceptedAustin7.setDescription("Programming for Social Sciences");

        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedAustin1,austinIE.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedAustin2,austinIE.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedAustin4,austinCS.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedAustin5,austinCS.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedAustin3,austinCS.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(acceptedAustin6,austinCS.getID());
        exchangeUniversityDepartmentService.addElectiveCourseByExchangeDepartmentID(acceptedAustin7, austinCS.getID());

        //NUS
        ExchangeUniversity nus = new ExchangeUniversity();
        nus.setCountry("Singapore");
        nus.setUniversityName("NUS");
        nus.setMaxUniversityQuota(15);
        nus.setUniversityQuota(15);
        nus.setAcceptedStudents(new ArrayList<>() );

        Course rejectNus1 = new Course();
        rejectNus1.setEcts(8.0);
        rejectNus1.setCourseName("IE-333");
        rejectNus1.setDescription("Optimization of Machines");
        courseService.addNewCourse(rejectNus1);


        Course rejectNus2 = new Course();
        rejectNus2.setEcts(9.0);
        rejectNus2.setCourseName("IE-101");
        rejectNus2.setDescription("Introduction to Industrial Thinking");
        courseService.addNewCourse(rejectNus2);

        List<Course> rejectedNUS = new ArrayList<>();
        rejectedNUS.add(rejectNus1);
        rejectedNUS.add(rejectNus2);

        nus.setRejectedCourses(rejectedNUS);
        exchangeUniversityService.addExchangeUniversity(nus);

        ExchangeUniversityDepartment nusIE = new ExchangeUniversityDepartment();
        nusIE.setDepartmentName("IE");
        nusIE.setExchangeUniversity(nus);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(nusIE);

        ExchangeUniversityDepartment nusCS = new ExchangeUniversityDepartment();
        nusCS.setDepartmentName("CS");
        nusCS.setExchangeUniversity(nus);
        exchangeUniversityDepartmentService.addExchangeUniversityDepartment(nusCS);



        Course nusIE1 = new Course();
        nusIE1.setEcts(11.0);
        nusIE1.setCourseName("IE-410");
        nusIE1.setDescription("Gaming Industry");

        Course nusIE2 = new Course();
        nusIE2.setEcts(16.0);
        nusIE2.setCourseName("IE-341");
        nusIE2.setDescription("Industry 4.0");


        Course nusCS1 = new Course();
        nusCS1.setEcts(8.0);
        nusCS1.setCourseName("CS-410");
        nusCS1.setDescription("Object Oriented Programming");

        Course nusCS2 = new Course();
        nusCS2.setEcts(9.0);
        nusCS2.setCourseName("CS-341");
        nusCS2.setDescription("Operating Systems");

        Course nusCS3 = new Course();
        nusCS3.setEcts(11.0);
        nusCS3.setCourseName("CS-281");
        nusCS3.setDescription("Database Systems");

        Course nusCS4 = new Course();
        nusCS4.setEcts(8.0);
        nusCS4.setCourseName("CS-121");
        nusCS4.setDescription("Word, Excel and More");

        Course nusCS5 = new Course();
        nusCS5.setEcts(8.0);
        nusCS5.setCourseName("CS-131");
        nusCS5.setDescription("Programming for Social Sciences");

        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(nusIE2,nusIE.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(nusIE1,nusIE.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(nusCS1,nusCS.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(nusCS3,nusCS.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(nusCS4,nusCS.getID());
        exchangeUniversityDepartmentService.addCourseByExchangeDepartmentID(nusCS2,nusCS.getID());
        exchangeUniversityDepartmentService.addElectiveCourseByExchangeDepartmentID(nusCS5, nusCS.getID());


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

        OutgoingStudent student1 = outgoingStudentRepository.findById(6L).get();
        OutgoingStudent student2 = outgoingStudentRepository.findById(7L).get();

        hashingPasswordHelper.setPassword("123");
        student1.setHashedPassword(hashingPasswordHelper.Hash()); // make passwords 123

        hashingPasswordHelper.setPassword("123");
        student2.setHashedPassword(hashingPasswordHelper.Hash());

        //Administrative Staff
        AdministrativeStaff yelda  = new AdministrativeStaff();
        yelda.setEmail("yeldaates@bilkent.edu.tr");
        yelda.setName("Yelda Irem Ates");
        hashingPasswordHelper.setPassword("123");
        List<Department> departmentsOfYelda = new ArrayList<>();
        departmentsOfYelda.add(cs);
        departmentsOfYelda.add(man);
        departmentsOfYelda.add(me);
        departmentsOfYelda.add(ie);
        departmentsOfYelda.add(eee);
        yelda.setHashedPassword(hashingPasswordHelper.Hash());
        yelda.setDepartments(departmentsOfYelda);
        administrativeStaffService.addAdministrativeStaff(yelda);

        //Course Coordinator
        CourseCoordinator eray = new CourseCoordinator();
        eray.setName("Eray Tuzun");
        eray.setDepartment(cs);
        List<Course> erayCourses = new ArrayList<>();
        erayCourses.add(course5);
        eray.setCourseList(erayCourses);
        eray.setEmail("eraytuzun@cs.bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        eray.setHashedPassword(hashingPasswordHelper.Hash());
        courseCoordinatorService.addCourseCoordinator(eray);

        CourseCoordinator selim = new CourseCoordinator();
        selim.setName("Selim Aksoy");
        selim.setDepartment(cs);
        List<Course> selimCourses = new ArrayList<>();
        selimCourses.add(course3);
        selimCourses.add(course4);
        selim.setCourseList(selimCourses);
        selim.setEmail("saksoy@cs.bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        selim.setHashedPassword(hashingPasswordHelper.Hash());
        courseCoordinatorService.addCourseCoordinator(selim);

        CourseCoordinator orsan = new CourseCoordinator();
        orsan.setName("Orsan Orge");
        orsan.setDepartment(man);
        List<Course> orsanCourses = new ArrayList<>();
        orsanCourses.add(man1);
        orsanCourses.add(man4);
        orsanCourses.add(man6);
        orsan.setCourseList(orsanCourses);
        orsan.setEmail("orsan@bilkent.edu.tr");
        hashingPasswordHelper.setPassword("123");
        orsan.setHashedPassword(hashingPasswordHelper.Hash());
        courseCoordinatorService.addCourseCoordinator(orsan);

       //Incoming Students
        IncomingStudent bond = new IncomingStudent();
        bond.setName("James Bond");
        bond.setStudentId(22101456L);

        bond.setEmail("james@mail.com");
        hashingPasswordHelper.setPassword("123");
        bond.setHashedPassword(hashingPasswordHelper.Hash());

        bond.setContractedUniversity(epfl);
        bond.setSemester("Spring");
        bond.setDepartment(cs);

        List<Course> prefOfBond = new ArrayList<>();
        prefOfBond.add(course1);
        prefOfBond.add(course3);
        prefOfBond.add(course5);
        prefOfBond.add(course8);
        bond.setPreferredCourses(prefOfBond);
        incomingStudentService.addIncomingStudent(bond);
        //Kendall
        IncomingStudent kendall = new IncomingStudent();
        kendall.setName("Kendall Jenner");
        kendall.setStudentId(22103357L);

        kendall.setEmail("kendal@mail.com");

        hashingPasswordHelper.setPassword("123");
        kendall.setHashedPassword(hashingPasswordHelper.Hash());

        kendall.setContractedUniversity(queens);
        kendall.setSemester("Fall");
        kendall.setDepartment(man);

        List<Course> prefOfKendall = new ArrayList<>();
        prefOfKendall.add(man1);
        prefOfKendall.add(man2);
        prefOfKendall.add(man3);
        prefOfKendall.add(man6);
        prefOfKendall.add(course9);
        kendall.setPreferredCourses(prefOfKendall);
        incomingStudentService.addIncomingStudent(kendall);


        return "Initialized Successfully!";
    }
}
