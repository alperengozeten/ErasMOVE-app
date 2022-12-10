package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.models.IncomingStudent;
import com.erasmuarrem.ErasMove.models.Course;
import com.erasmuarrem.ErasMove.models.Token;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.IncomingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IncomingStudentService {
    private final IncomingStudentRepository incomingStudentRepository;
    private final CourseRepository courseRepository;
    private final TokenRepository tokenRepository;
    private final AdminService adminService;
    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();
    @Autowired
    public IncomingStudentService( IncomingStudentRepository incomingStudentRepository , CourseRepository courseRepository, TokenRepository tokenRepository,
                                   AdminService adminService) {
        this.courseRepository = courseRepository;
        this.incomingStudentRepository = incomingStudentRepository;
        this.tokenRepository = tokenRepository;
        this.adminService = adminService;
    }

    public void addIncomingStudent(String token ,IncomingStudent incomingStudent) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for ( int i = 0; i < admins.size(); i++ ) {
                if(admins.get(i).getToken() != null ) {
                    if ( admins.get(i).getToken().getToken().equals(token) && admins.get(i).getToken().getIsActivelyUsed() ) {
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

    public void deleteIncomingStudentById( Long id ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById(id);
        if ( !incomingStudentOptional.isPresent() ) {
            throw new IllegalStateException("The incoming student with id  "+ id + " doesn't exist.");
        }
        incomingStudentRepository.deleteById(id);
    }

    public IncomingStudent getIncomingStudentById( Long id) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById( id );
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with id  "+ id + " doesn't exist.");
        }
        return incomingStudentOptional.get();
    }

    public List<IncomingStudent> getIncomingStudents() {
        return incomingStudentRepository.findAll();
    }

    public void addCourseToPreferredCoursesById( Long studentId, Long courseId ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById( studentId );
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with id  "+ studentId + " doesn't exist.");
        }

        Optional<Course> courseOptional = courseRepository.findById( courseId);
        if( !courseOptional.isPresent() ) {
            throw new IllegalStateException("The course with id " + courseId + " doesn't exist in host university."   );
        }

        IncomingStudent newIncomingStudent = incomingStudentOptional.get();

        List<Course> newCourseList = newIncomingStudent.getPreferredCourses();
        if ( !newCourseList.contains(courseOptional.get()) ) {
            newCourseList.add(courseOptional.get());
        }
        else {
            throw new IllegalStateException("The course with id " + courseId + " is already in student's preferred course list."   );

        }
        newIncomingStudent.setPreferredCourses(newCourseList);

        incomingStudentRepository.save(incomingStudentOptional.get());
    }

    public void deleteCourseFromPreferredCoursesById( Long studentId, Long courseId ) {
        Optional<IncomingStudent> incomingStudentOptional = incomingStudentRepository.findById( studentId );
        if ( !incomingStudentOptional.isPresent() ){
            throw new IllegalStateException("The incoming student with id  "+ studentId + " doesn't exist.");
        }

        Optional<Course> courseOptional = courseRepository.findById( courseId);
        if( !courseOptional.isPresent() ) {
            throw new IllegalStateException("The course with id " + courseId + " doesn't exist in host university."   );
        }

        IncomingStudent newIncomingStudent = incomingStudentOptional.get();

        List<Course> newCourseList = newIncomingStudent.getPreferredCourses();

        newCourseList.remove(courseOptional.get());
        newIncomingStudent.setPreferredCourses(newCourseList);

        incomingStudentRepository.save(incomingStudentOptional.get());
    }

    public String login( String email, String password) {
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
    public String logOut(Long id ) {
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
    public void changePasswordByEmail( String email, String newPassword, String oldPassword ) {
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


}
