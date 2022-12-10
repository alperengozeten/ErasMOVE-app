package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.models.Token;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import com.erasmuarrem.ErasMove.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdministrativeStaffService {

    private final AdministrativeStaffRepository administrativeStaffRepository;
    private final TokenRepository tokenRepository;
    private final AdminService adminService;

    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();

    @Autowired
    public AdministrativeStaffService( AdministrativeStaffRepository administrativeStaffRepository, TokenRepository tokenRepository, AdminService adminService) {
        this.administrativeStaffRepository = administrativeStaffRepository;
        this.adminService = adminService;
        this.tokenRepository = tokenRepository;
    }

    public void addAdministrativeStaff(String token, AdministrativeStaff administrativeStaff) {
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
                Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findById( administrativeStaff.getID() );
                if ( administrativeStaffOptional.isPresent() ) {
                    throw new IllegalStateException("The Administrative Staff with ID " +administrativeStaff.getID()+  " already exists.");
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

        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative staff with department id:" + id + " doesn't exist!");
        }

        return administrativeStaffOptional.get();
    }

    public AdministrativeStaff getAdministrativeStaffByDepartmentName(String departmentName) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository
                .findByDepartments_DepartmentName(departmentName);

        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative Staff with department:" + departmentName + " doesn't exist!");
        }

        return administrativeStaffOptional.get();
    }

    public String login( String email, String password) {
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
    public String logOut(Long id ) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findById(id);
        if ( !administrativeStaffOptional.isPresent() ){
            return "The administrative staff with email  "+ id + " doesn't exist.";
        }
        AdministrativeStaff currStaff = administrativeStaffOptional.get();
        Token currToken = currStaff.getUserToken();
        currToken.setLastActive(LocalDateTime.now());
        currToken.setIsActivelyUsed(false);
        tokenRepository.save(currToken);

        administrativeStaffRepository.save(currStaff);
        return "Log out successful";
    }
    public void changePasswordByEmail( String email, String newPassword, String oldPassword ) {
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

}
