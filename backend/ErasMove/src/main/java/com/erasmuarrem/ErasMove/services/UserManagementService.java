package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserManagementService {

    private final TokenRepository tokenRepository;
    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final IncomingStudentRepository incomingStudentRepository;
    private final AdministrativeStaffRepository administrativeStaffRepository;
    private final CourseCoordinatorRepository courseCoordinatorRepository;
    private final AdminService adminService;
    private final EmailService emailService;

    public UserManagementService(TokenRepository tokenRepository, OutgoingStudentRepository outgoingStudentRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository,
                                 IncomingStudentRepository incomingStudentRepository, AdministrativeStaffRepository administrativeStaffRepository,
                                 AdminService adminService, CourseCoordinatorRepository courseCoordinatorRepository, EmailService emailService ) {
        this.tokenRepository = tokenRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.incomingStudentRepository = incomingStudentRepository;
        this.administrativeStaffRepository = administrativeStaffRepository;
        this.adminService = adminService;
        this.courseCoordinatorRepository = courseCoordinatorRepository;
        this.emailService = emailService;
    }
    public List<ApplicationUser> getAllUsers() {

        List<ApplicationUser> users = new ArrayList<>();

        users.addAll( outgoingStudentRepository.findAll());
        users.addAll( incomingStudentRepository.findAll());
        users.addAll( courseCoordinatorRepository.findAll());
        users.addAll( departmentCoordinatorRepository.findAll() );
        users.addAll( administrativeStaffRepository.findAll() );
        return users;
    }


    public ApplicationUser getUserById( Long userID ) {

        List<ApplicationUser> users = getAllUsers();
        for ( ApplicationUser user : users ) {
            if (Objects.equals(user.getID(), userID)) {
                return user;
            }
        }
        throw  new IllegalStateException("There isn't a user with id "+ userID +" !" );
    }

    public ApplicationUser getUserByEmail( String email ) {

        List<ApplicationUser> users = getAllUsers();
        for ( ApplicationUser user : users ) {
            if (Objects.equals(user.getEmail(), email)) {
                return user;
            }
        }
        throw  new IllegalStateException("There isn't a user with email "+ email +" !" );
    }

    public void addOutgoingStudent(String adminToken, OutgoingStudent outgoingStudent) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for (Admin admin : admins) {
                if (admin.getToken() != null) {
                    if (admin.getToken().getToken().equals(adminToken) && admin.getToken().getIsActivelyUsed()) {
                        tokenMatches = true;
                        break;
                    }
                }
            }
            if ( tokenMatches ) {
                Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findByEmail( outgoingStudent.getEmail() );
                if ( outgoingStudentOptional.isPresent() ) {
                    throw new IllegalStateException("The outgoing student with email " +outgoingStudent.getEmail()+  " already exists.");
                }
                hashingPasswordHelper.setPassword(outgoingStudent.getHashedPassword());
                outgoingStudent.setHashedPassword(hashingPasswordHelper.Hash());
                outgoingStudentRepository.save(outgoingStudent);
            }
            else {
                throw new IllegalStateException("Unauthorized Request!");
            }
        }
        else {
            throw new IllegalStateException("Unauthorized Request!");
        }
    }

    public String logOutOutgoingStudent(Long id) {
        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(id);
        if ( !outgoingStudentOptional.isPresent() ){
            return "The outgoing student with id  "+ id + " doesn't exist.";
        }
        OutgoingStudent currStu = outgoingStudentOptional.get();
        Token currToken = currStu.getUserToken();
        currToken.setLastActive(LocalDateTime.now());
        currToken.setIsActivelyUsed(false);
        tokenRepository.save(currToken);

        outgoingStudentRepository.save(currStu);
        return "Log out successful";
    }

    public String loginOutgoingStudent(String email, String password) {
        hashingPasswordHelper = HashingPasswordHelper.getInstance();
        hashingPasswordHelper.setPassword(password);
        String hashedPassword = hashingPasswordHelper.Hash();

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findByEmail(email);
        if ( !outgoingStudentOptional.isPresent() ){
            return "The outgoing student with email "+ email + " doesn't exist.";
        }
        else {
            OutgoingStudent currStu = outgoingStudentOptional.get();
            if ( hashedPassword.equals(currStu.getHashedPassword()) ) {

                Token token = new Token();
                token.setIsActivelyUsed(true);
                token.setLastActive(LocalDateTime.now());

                String strToken = token.generateToken();
                tokenRepository.save(token);
                currStu.setUserToken(token);
                outgoingStudentRepository.save(currStu);
                return "OS"+strToken;
            }
            return "Incorrect login credentials.";
        }
    }

    public void changePasswordByEmailOutgoingStudent(String email, String newPass, String oldPass) {

        hashingPasswordHelper.setPassword(newPass);
        String newHashedPassword = hashingPasswordHelper.Hash();

        hashingPasswordHelper.setPassword(oldPass);
        String oldHashedPassword = hashingPasswordHelper.Hash();

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findByEmail(email);
        if ( !outgoingStudentOptional.isPresent() ){
            throw new IllegalStateException("The outgoing student with email  "+ email + " doesn't exist.");
        }
        OutgoingStudent currStu = outgoingStudentOptional.get();
        if ( currStu.getHashedPassword().equals(oldHashedPassword) ) {
            currStu.setHashedPassword(newHashedPassword);
            outgoingStudentRepository.save(currStu);
        }
        else {
            throw new IllegalStateException("Incorrect old password!");
        }
    }

    // DEPARTMENT COORDINATOR

    public ResponseEntity<String> addDepartmentCoordinator(String token, DepartmentCoordinator departmentCoordinator) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for (Admin admin : admins) {
                if (admin.getToken() != null) {
                    if (admin.getToken().getToken().equals(token) && admin.getToken().getIsActivelyUsed()) {
                        tokenMatches = true;
                        break;
                    }
                }
            }
            if ( tokenMatches ) {
                Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findByEmail( departmentCoordinator.getEmail() );
                if ( departmentCoordinatorOptional.isPresent() ) {
                    return new ResponseEntity<>("The department coordinator with " +departmentCoordinator.getEmail()+  " already exists.", HttpStatus.BAD_REQUEST);
                }

                Optional<DepartmentCoordinator> coordinatorOptional = departmentCoordinatorRepository.findByDepartmentID(
                        departmentCoordinator.getDepartment().getID()
                );

                if ( coordinatorOptional.isPresent() ) {
                    return new ResponseEntity<>("Department Coordinator for Department with id:" + departmentCoordinator.getDepartment().getID() + " already exists!", HttpStatus.BAD_REQUEST);
                }

                hashingPasswordHelper.setPassword(departmentCoordinator.getHashedPassword());
                departmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
                departmentCoordinatorRepository.save(departmentCoordinator);

                return new ResponseEntity<>("Department Coordinator added!", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Unauthorized Request!", HttpStatus.BAD_REQUEST);
            }
        }
        else {
            return new ResponseEntity<>("Unauthorized Request!", HttpStatus.BAD_REQUEST);
        }
    }

    public String loginDepartmentCoordinator(String email, String password) {
        hashingPasswordHelper = HashingPasswordHelper.getInstance();
        hashingPasswordHelper.setPassword(password);
        String hashedPassword = hashingPasswordHelper.Hash();

        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findByEmail(email);
        if ( !departmentCoordinatorOptional.isPresent() ){
            return "The department coordinator with email  "+ email + " doesn't exist.";
        }
        else {
            DepartmentCoordinator currDepCord = departmentCoordinatorOptional.get();
            if ( hashedPassword.equals(currDepCord.getHashedPassword()) ) {

                Token token = new Token();
                token.setIsActivelyUsed(true);
                token.setLastActive(LocalDateTime.now());

                String strToken = token.generateToken();
                tokenRepository.save(token);
                currDepCord.setUserToken(token);
                departmentCoordinatorRepository.save(currDepCord);
                return "DC"+strToken;
            }
            return "Incorrect login credentials.";
        }
    }

    public String logOutDepartmentCoordinator(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findById(id);
        if ( !departmentCoordinatorOptional.isPresent() ){
            return "The department coordinator with id  "+ id + " doesn't exist.";
        }
        DepartmentCoordinator currDepCord = departmentCoordinatorOptional.get();
        Token currToken = currDepCord.getUserToken();
        currToken.setLastActive(LocalDateTime.now());
        currToken.setIsActivelyUsed(false);
        tokenRepository.save(currToken);

        departmentCoordinatorRepository.save(currDepCord);
        return "Log out successful";
    }

    public void changePasswordByEmailDepartmentCoordinator(String email, String newPass, String oldPass) {
        hashingPasswordHelper.setPassword(newPass);
        String newHashedPassword = hashingPasswordHelper.Hash();

        hashingPasswordHelper.setPassword(oldPass);
        String oldHashedPassword = hashingPasswordHelper.Hash();

        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findByEmail(email);
        if ( !departmentCoordinatorOptional.isPresent() ){
            throw new IllegalStateException("The department coordinator with email  "+ email  + " doesn't exist.");
        }
        DepartmentCoordinator currDepCord = departmentCoordinatorOptional.get();
        if ( currDepCord.getHashedPassword().equals(oldHashedPassword) ) {
            currDepCord.setHashedPassword(newHashedPassword);
            departmentCoordinatorRepository.save(currDepCord);
        }
        else {
            throw new IllegalStateException("Incorrect old password!");
        }
    }

    // ADMINISTRATIVE STAFF

    public void addAdministrativeStaff(String token, AdministrativeStaff administrativeStaff) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for (Admin admin : admins) {
                if (admin.getToken() != null) {
                    if (admin.getToken().getToken().equals(token) && admin.getToken().getIsActivelyUsed()) {
                        tokenMatches = true;
                        break;
                    }
                }
            }
            if ( tokenMatches ) {
                Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByEmail( administrativeStaff.getEmail() );
                if ( administrativeStaffOptional.isPresent() ) {
                    throw new IllegalStateException("The Administrative Staff with email " +administrativeStaff.getEmail()+  " already exists.");
                }
                hashingPasswordHelper.setPassword(administrativeStaff.getHashedPassword());
                administrativeStaff.setHashedPassword(hashingPasswordHelper.Hash());
                administrativeStaffRepository.save(administrativeStaff);
            }
            else {
                throw new IllegalStateException("Unauthorized Request!");
            }
        }
        else {
            throw new IllegalStateException("Unauthorized Request!");
        }
    }

    public String loginAdministrativeStaff( String email, String password) {
        hashingPasswordHelper = HashingPasswordHelper.getInstance();
        hashingPasswordHelper.setPassword(password);
        String hashedPassword = hashingPasswordHelper.Hash();

        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByEmail(email);
        if ( !administrativeStaffOptional.isPresent() ){
            return "The administrative staff with email  "+ email + " doesn't exist.";
        }
        else {
            AdministrativeStaff currStaff = administrativeStaffOptional.get();
            if ( hashedPassword.equals(currStaff.getHashedPassword()) ) {

                Token token = new Token();
                token.setIsActivelyUsed(true);
                token.setLastActive(LocalDateTime.now());

                String strToken = token.generateToken();
                tokenRepository.save(token);
                currStaff.setUserToken(token);
                administrativeStaffRepository.save(currStaff);
                return "AS"+strToken;
            }
            return "Incorrect login credentials.";
        }
    }
    public String logOutAdministrativeStaff(Long id ) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findById(id);
        if ( !administrativeStaffOptional.isPresent() ){
            return "The administrative staff with id  "+ id + " doesn't exist.";
        }
        AdministrativeStaff currStaff = administrativeStaffOptional.get();
        Token currToken = currStaff.getUserToken();
        currToken.setLastActive(LocalDateTime.now());
        currToken.setIsActivelyUsed(false);
        tokenRepository.save(currToken);

        administrativeStaffRepository.save(currStaff);
        return "Log out successful";
    }
    public void changePasswordByEmailAdministrativeStaff( String email, String newPassword, String oldPassword ) {
        hashingPasswordHelper.setPassword(newPassword);
        String newHashedPassword = hashingPasswordHelper.Hash();

        hashingPasswordHelper.setPassword(oldPassword);
        String oldHashedPassword = hashingPasswordHelper.Hash();

        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByEmail(email);
        if ( !administrativeStaffOptional.isPresent() ){
            throw new IllegalStateException("The administrative staff with email  "+ email + " doesn't exist.");
        }
        AdministrativeStaff currStaff = administrativeStaffOptional.get();
        if ( currStaff.getHashedPassword().equals(oldHashedPassword) ) {
            currStaff.setHashedPassword(newHashedPassword);
            administrativeStaffRepository.save(currStaff);
        }
        else {
            throw new IllegalStateException("Incorrect old password!");
        }
    }

    // INCOMING STUDENT

    public void addIncomingStudent(String token ,IncomingStudent incomingStudent) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for (Admin admin : admins) {
                if (admin.getToken() != null) {
                    if (admin.getToken().getToken().equals(token) && admin.getToken().getIsActivelyUsed()) {
                        tokenMatches = true;
                        break;
                    }
                }
            }
            if ( tokenMatches ) {
                Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findByEmail( incomingStudent.getEmail() );
                if ( incomingStudentOptional.isPresent() ) {
                    throw new IllegalStateException("The incoming student with email " +incomingStudent.getEmail()+  " already exists.");
                }
                hashingPasswordHelper.setPassword(incomingStudent.getHashedPassword());
                incomingStudent.setHashedPassword(hashingPasswordHelper.Hash());
                incomingStudentRepository.save(incomingStudent);
            }
            else {
                throw new IllegalStateException("Unauthorized Request!");
            }
        }
        else {
            throw new IllegalStateException("Unauthorized Request!");
        }
    }

    public String loginIncomingStudent( String email, String password) {
        hashingPasswordHelper = HashingPasswordHelper.getInstance();
        hashingPasswordHelper.setPassword(password);
        String hashedPassword = hashingPasswordHelper.Hash();

        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findByEmail(email);
        if ( !incomingStudentOptional.isPresent() ){
            return "The incoming student with email  "+ email + " doesn't exist.";
        }
        else {
            IncomingStudent currStu = incomingStudentOptional.get();
            if ( hashedPassword.equals(currStu.getHashedPassword()) ) {

                Token token = new Token();
                token.setIsActivelyUsed(true);
                token.setLastActive(LocalDateTime.now());

                String strToken = token.generateToken();
                tokenRepository.save(token);
                currStu.setUserToken(token);
                incomingStudentRepository.save(currStu);
                return "IS"+strToken;
            }
            return "Incorrect login credentials.";
        }
    }
    public String logOutIncomingStudent(Long id ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById(id);
        if ( !incomingStudentOptional.isPresent() ){
            return "The incoming student with id  "+ id + " doesn't exist.";
        }
        IncomingStudent currStu = incomingStudentOptional.get();
        Token currToken = currStu.getUserToken();
        currToken.setLastActive(LocalDateTime.now());
        currToken.setIsActivelyUsed(false);
        tokenRepository.save(currToken);

        incomingStudentRepository.save(currStu);
        return "Log out successful";
    }
    public void changePasswordByEmailIncomingStudent( String email, String newPassword, String oldPassword ) {
        hashingPasswordHelper.setPassword(newPassword);
        String newHashedPassword = hashingPasswordHelper.Hash();

        hashingPasswordHelper.setPassword(oldPassword);
        String oldHashedPassword = hashingPasswordHelper.Hash();

        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findByEmail(email);
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with email  "+ email + " doesn't exist.");
        }
        IncomingStudent currStu = incomingStudentOptional.get();
        if ( currStu.getHashedPassword().equals(oldHashedPassword) ) {
            currStu.setHashedPassword(newHashedPassword);
            incomingStudentRepository.save(currStu);
        }
        else {
            throw new IllegalStateException("Incorrect old password!");
        }
    }

    //COURSE COORDINATOR
    public ResponseEntity<String> addCourseCoordinator(String token , CourseCoordinator courseCoordinator) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for (Admin admin : admins) {
                if (admin.getToken() != null) {
                    if (admin.getToken().getToken().equals(token) && admin.getToken().getIsActivelyUsed()) {
                        tokenMatches = true;
                        break;
                    }
                }
            }
            if ( tokenMatches ) {
                Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findByEmail( courseCoordinator.getEmail() );
                if ( courseCoordinatorOptional.isPresent() ) {
                    return new ResponseEntity<>("The course coordinator with email " +courseCoordinator.getEmail()+  " already exists.", HttpStatus.BAD_REQUEST);
                }

                List<Course> courseList = courseCoordinator.getCourseList();

                for (Course course : courseList) {
                    Optional<CourseCoordinator> coordinatorOptional = courseCoordinatorRepository
                            .findByCourseList_ID(course.getID());

                    if ( coordinatorOptional.isPresent() ) {
                        return new ResponseEntity<>("The course with id:" + course.getID() + " already has a course coordinator!", HttpStatus.BAD_REQUEST);
                    }
                }

                hashingPasswordHelper.setPassword(courseCoordinator.getHashedPassword());
                courseCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
                courseCoordinatorRepository.save(courseCoordinator);

                return new ResponseEntity<>("Course Coordinator has been added!", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Unauthorized Request!", HttpStatus.BAD_REQUEST);
            }
        }
        else {
            return new ResponseEntity<>("Unauthorized Request!", HttpStatus.BAD_REQUEST);
        }
    }
    public String loginCourseCoordinator( String email, String password) {
        hashingPasswordHelper = HashingPasswordHelper.getInstance();
        hashingPasswordHelper.setPassword(password);
        String hashedPassword = hashingPasswordHelper.Hash();

        Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findByEmail(email);
        if ( !courseCoordinatorOptional.isPresent() ){
            return "The course coordinator with email  "+ email + " doesn't exist.";
        }
        else {
            CourseCoordinator currCourseCord = courseCoordinatorOptional.get();
            if ( hashedPassword.equals(currCourseCord.getHashedPassword()) ) {

                Token token = new Token();
                token.setIsActivelyUsed(true);
                token.setLastActive(LocalDateTime.now());

                String strToken = token.generateToken();
                tokenRepository.save(token);
                currCourseCord.setUserToken(token);
                courseCoordinatorRepository.save(currCourseCord);
                return "CC"+strToken;
            }
            return "Incorrect login credentials.";
        }
    }
    public String logoutCourseCoordinator(Long id ) {
        Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findById(id);
        if ( !courseCoordinatorOptional.isPresent() ){
            return "The course coordinator with id  "+ id + " doesn't exist.";
        }
        CourseCoordinator currCourseCord = courseCoordinatorOptional.get();
        Token currToken = currCourseCord.getUserToken();
        currToken.setLastActive(LocalDateTime.now());
        currToken.setIsActivelyUsed(false);
        tokenRepository.save(currToken);

        courseCoordinatorRepository.save(currCourseCord);
        return "Log out successful";
    }
    public void changePasswordByCourseCoordinator( String email, String newPassword, String oldPassword ) {
        hashingPasswordHelper.setPassword(newPassword);
        String newHashedPassword = hashingPasswordHelper.Hash();

        hashingPasswordHelper.setPassword(oldPassword);
        String oldHashedPassword = hashingPasswordHelper.Hash();

        Optional<CourseCoordinator> courseCoordinatorOptional = courseCoordinatorRepository.findByEmail(email);
        if ( !courseCoordinatorOptional.isPresent() ){
            throw new IllegalStateException("The course coordinator with email  "+ email + " doesn't exist.");
        }
        CourseCoordinator currCourseCord = courseCoordinatorOptional.get();
        if ( currCourseCord.getHashedPassword().equals(oldHashedPassword) ) {
            currCourseCord.setHashedPassword(newHashedPassword);
            courseCoordinatorRepository.save(currCourseCord);
        }
        else {
            throw new IllegalStateException("Incorrect old password!");
        }
    }

    public String sendActivationCode( String emailAdress ) {
        Email email = new Email();
        email.setRecipient(emailAdress);
        email.setSubject("Forgotten Password: Activation Code");
        String activationCode = email.generateActivationCode();
        ApplicationUser receiver = getUserByEmail(emailAdress);
        if ( receiver != null) {
            Long userId = receiver.getID();
            email.addActivationCode(activationCode,userId);
        }
        email.setMail("Dear Erasmove User,\n\nYou can use the following activation code: " + activationCode+"\n\nHARDER, BETTER, BILKENTER");
        return emailService.sendSimpleMail(email);

    }

   public void forgotPassword( String email, String activationCode, String newPassword ) {
        //As IDs are definitely unique, first we should find ID.
       ApplicationUser receiver = getUserByEmail(email);
       Long ID = receiver.getID();
       //Hashing
       hashingPasswordHelper.setPassword(newPassword);
       String newHashedPassword = hashingPasswordHelper.Hash();
       if ( Email.activationCodes.get(ID).isEmpty() ) {
           throw new IllegalStateException("There isn't a activation code corresponding to the user with email " + email);
       }
       else {
           if ( Email.activationCodes.get(ID).equals(activationCode) ) {
               if (courseCoordinatorRepository.findById(ID).isPresent()) {
                   CourseCoordinator courseCoordinator = courseCoordinatorRepository.findById(ID).get();
                   courseCoordinator.setHashedPassword(newHashedPassword);
                   courseCoordinatorRepository.save(courseCoordinator);
               }
               else if (departmentCoordinatorRepository.findById(ID).isPresent()) {
                   DepartmentCoordinator departmentCoordinator = departmentCoordinatorRepository.findById(ID).get();
                   departmentCoordinator.setHashedPassword(newHashedPassword);
                   departmentCoordinatorRepository.save(departmentCoordinator);
               }
               else if ( outgoingStudentRepository.findById(ID).isPresent() ) {
                   OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(ID).get();
                   outgoingStudent.setHashedPassword(newHashedPassword);
                   outgoingStudentRepository.save(outgoingStudent);

               }
               else if ( incomingStudentRepository.findById(ID).isPresent() ) {
                   IncomingStudent incomingStudent = incomingStudentRepository.findById(ID).get();
                   incomingStudent.setHashedPassword(newHashedPassword);
                   incomingStudentRepository.save(incomingStudent);
               } else if ( administrativeStaffRepository.findById(ID).isPresent()) {
                   AdministrativeStaff administrativeStaff = administrativeStaffRepository.findById(ID).get();
                   administrativeStaff.setHashedPassword(newHashedPassword);
                   administrativeStaffRepository.save(administrativeStaff);
               }

               Email.activationCodes.remove(ID);
           }
           else {
               throw new IllegalStateException("Incorrect Activation Code!");
           }
       }

   }
}
