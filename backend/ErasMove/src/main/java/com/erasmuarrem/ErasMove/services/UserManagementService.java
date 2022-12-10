package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.models.Token;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.TokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {

    private final TokenRepository tokenRepository;
    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final AdminService adminService;

    public UserManagementService(TokenRepository tokenRepository, OutgoingStudentRepository outgoingStudentRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, AdminService adminService) {
        this.tokenRepository = tokenRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.adminService = adminService;
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

    public void addDepartmentCoordinator(String token, DepartmentCoordinator departmentCoordinator) {
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
                    throw new IllegalStateException("The department coordinator with " +departmentCoordinator.getEmail()+  " already exists.");
                }
                hashingPasswordHelper.setPassword(departmentCoordinator.getHashedPassword());
                departmentCoordinator.setHashedPassword(hashingPasswordHelper.Hash());
                departmentCoordinatorRepository.save(departmentCoordinator);
            }
            else {
                throw new IllegalStateException("Unauthorized Request!");
            }
        }
        else {
            throw new IllegalStateException("Unauthorized Request!");
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
}
