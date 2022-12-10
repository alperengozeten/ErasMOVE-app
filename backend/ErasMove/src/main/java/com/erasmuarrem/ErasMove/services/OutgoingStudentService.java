package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.models.IncomingStudent;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.models.Token;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OutgoingStudentService {

    private final OutgoingStudentRepository outgoingStudentRepository;
    private final AdminService adminService;
    private final TokenRepository tokenRepository;
    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();
    @Autowired
    public OutgoingStudentService(OutgoingStudentRepository outgoingStudentRepository, AdminService adminService, TokenRepository tokenRepository ) {
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.tokenRepository = tokenRepository;
        this.adminService = adminService;
    }

    public List<OutgoingStudent> getStudents() {
        return outgoingStudentRepository.findAll();
    }

    public void addOutgoingStudent(String adminToken, OutgoingStudent outgoingStudent) {
        List<Admin> admins = adminService.getAllAdmins();
        if (admins!=null ) {
            boolean tokenMatches = false;
            for ( int i = 0; i < admins.size(); i++ ) {
                if(admins.get(i).getToken() != null ) {
                    if ( admins.get(i).getToken().getToken().equals(adminToken) && admins.get(i).getToken().getIsActivelyUsed() ) {
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

    public Optional<OutgoingStudent> getStudentByID(Long id) {
        return outgoingStudentRepository.findById(id);
    }

    public String logOut(Long id) {
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

    public String login(String email, String password) {
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

    public void changePasswordByEmail(String email, String newPass, String oldPass) {

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
}
