package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdministrativeStaffService {

    private final AdministrativeStaffRepository administrativeStaffRepository;
    private final DepartmentService departmentService;
    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();
    private final EmailService emailService;
    private final ApplicationService applicationService;
    private final OutgoingStudentService outgoingStudentService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ExchangeUniversityService exchangeUniversityService;
    @Autowired
    public AdministrativeStaffService(AdministrativeStaffRepository administrativeStaffRepository, DepartmentService departmentService, EmailService emailService,
                                      ApplicationService applicationService, OutgoingStudentService outgoingStudentService, ErasmusUniversityService erasmusUniversityService, ExchangeUniversityService exchangeUniversityService ) {
        this.administrativeStaffRepository = administrativeStaffRepository;
        this.departmentService = departmentService;
        this.emailService = emailService;
        this.outgoingStudentService = outgoingStudentService;
        this.applicationService = applicationService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.exchangeUniversityService = exchangeUniversityService;
    }

    public List<AdministrativeStaff> getAdministrativeStaffs() {
        return administrativeStaffRepository.findAll();
    }

    public AdministrativeStaff getAdministrativeStaff(Long id) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findById(id);
        
        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative Staff with id:" + id + " doesn't exist!");
        }
        
        return administrativeStaffOptional.get();
    }

    public void deleteAdministrativeStaff(Long id) {
        administrativeStaffRepository.deleteById(id);
    }

    public AdministrativeStaff getAdministrativeStaffByDepartmentId(Long id) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByDepartments_ID(id);

        return administrativeStaffOptional.orElse(null);
    }

    public AdministrativeStaff getAdministrativeStaffByDepartmentName(String departmentName) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository
                .findByDepartments_DepartmentName(departmentName);

        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative Staff with department:" + departmentName + " doesn't exist!");
        }

        return administrativeStaffOptional.get();
    }

    public ResponseEntity<String> addAdministrativeStaff(AdministrativeStaff administrativeStaff) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByEmail(administrativeStaff.getEmail());

        if ( administrativeStaffOptional.isPresent() ) {
            return new ResponseEntity<>("The Administrative Staff with email " + administrativeStaff.getEmail() + " already exists!", HttpStatus.BAD_REQUEST);
        }

        List<Department> departmentList = administrativeStaff.getDepartments();

        for (Department department : departmentList) {
            Optional<AdministrativeStaff> optionalAdministrativeStaff = administrativeStaffRepository
                    .findByDepartments_ID(department.getID());

            if ( optionalAdministrativeStaff.isPresent() ) {
                return new ResponseEntity<>("There is already an Administrative Staff for Department with id:" + department.getID() + "!", HttpStatus.BAD_REQUEST);
            }
        }

        administrativeStaffRepository.save(administrativeStaff);
        return new ResponseEntity<>("Administrative Staff created!", HttpStatus.OK);
    }


    public ResponseEntity<String> addStudents( boolean isErasmus, Long departmentid, List<ApplicationWrapper> applicationLines )  {
        for ( int i =0; i < applicationLines.size(); i++ ) {

            OutgoingStudent newStudent = new OutgoingStudent();

            newStudent.setName(applicationLines.get(i).getFirstName() +" " + applicationLines.get(i).getLastName() );
            newStudent.setDepartment(departmentService.getDepartmentById(departmentid));
            newStudent.setCgpa(applicationLines.get(i).getCgpa());
            newStudent.setIsErasmus(isErasmus);
            newStudent.setStudentId( applicationLines.get(i).getStudentId() );
            newStudent.setEmail( ( applicationLines.get(i).getFirstName() + "." + applicationLines.get(i).getLastName() + "@ug.bilkent.edu.tr").toLowerCase() );//??
            //newStudent.setSemester();??
            //newStudent.setIsDoubleMajor()??

            String newPassword = RandomPasswordGenerator();
            hashingPasswordHelper.setPassword(newPassword);
            newStudent.setHashedPassword(hashingPasswordHelper.Hash());
             Email email = new Email();
             email.setMail("Dear " + newStudent.getName() + ",\n\n" + "You can use the attached login credentials below: \n\n"
                     + "ID : " + newStudent.getStudentId() + "\nPassword : " + newPassword);
             email.setRecipient(newStudent.getEmail());
             email.setSubject("Welcome to Erasmove! Login Credentials");
             System.out.println(emailService.sendSimpleMail(email));

            outgoingStudentService.addOutgoingStudent(newStudent);

            Application newApplication = new Application();
            newApplication.setApplicationScore(applicationLines.get(i).getTotalPoint());
            newApplication.setOutgoingStudent(newStudent);
            List<Long> uniIDs = new ArrayList<>();
            if ( isErasmus ) {
                for( int k = 0; k < applicationLines.get(i).getSelectedUniversities().size(); k++ ) {
                    ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByName(applicationLines.get(i).getSelectedUniversities().get(k));
                    uniIDs.add( erasmusUniversity.getID() );
                }
            }
            else {
                for( int k = 0; k < applicationLines.get(i).getSelectedUniversities().size(); k++ ) {
                    ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByName(applicationLines.get(i).getSelectedUniversities().get(k));
                    uniIDs.add( exchangeUniversity.getID() );
                }

            }
            newApplication.setSelectedSemester(applicationLines.get(i).getSelectedSemester());

            newApplication.setSelectedUniversityIds(uniIDs);

            applicationService.addApplication(newApplication);
        }
        return new ResponseEntity<>("All outgoing students are added successfully!" , HttpStatus.OK);
    }
    private String RandomPasswordGenerator() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@.-*!";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 8) { // length of the password.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        return salt.toString();
    }

}
