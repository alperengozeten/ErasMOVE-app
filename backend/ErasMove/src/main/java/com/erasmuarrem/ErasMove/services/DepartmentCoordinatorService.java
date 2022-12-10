package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
import com.erasmuarrem.ErasMove.models.Token;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentCoordinatorService {

    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final TokenRepository tokenRepository;
    private final AdminService adminService;
    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();

    @Autowired
    public DepartmentCoordinatorService(DepartmentCoordinatorRepository departmentCoordinatorRepository, TokenRepository tokenRepository, AdminService adminService) {
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.tokenRepository = tokenRepository;
        this.adminService = adminService;
    }

    public List<DepartmentCoordinator> getDepartmentCoordinators() {
        return departmentCoordinatorRepository.findAll();
    }

    public DepartmentCoordinator getDepartmentCoordinatorById(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findById(id);

        if ( !departmentCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Department Coordinator with id: " + id + " doesn't exist!");
        }

        return departmentCoordinatorOptional.get();
    }

    public void addDepartmentCoordinator(String token, DepartmentCoordinator departmentCoordinator) {
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

    public DepartmentCoordinator getDepartmentCoordinatorByDepartmentId(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findByDepartmentID(id);

        if ( !departmentCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Department Coordinator with department id:" + id + " doesn't exist!");
        }

        return departmentCoordinatorOptional.get();
    }

    public void deleteDepartmentCoordinatorById(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findById(id);

        if ( !departmentCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Department Coordinator with id:" + id + " doesn't exist!");
        }

        departmentCoordinatorRepository.deleteById(id);
    }

    public String login(String email, String password) {
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

    public String logOut(Long id) {
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

    public void changePasswordByEmail(String email, String newPass, String oldPass) {
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
