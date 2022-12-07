package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.Helpers.HashingPasswordHelper;
import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.models.Token;
import com.erasmuarrem.ErasMove.repositories.AdminRepository;
import com.erasmuarrem.ErasMove.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private final AdminRepository adminRepository;
    @Autowired
    private final TokenRepository tokenRepository;

    private HashingPasswordHelper hashingPasswordHelper = HashingPasswordHelper.getInstance();

    public AdminService( AdminRepository adminRepository, TokenRepository tokenRepository ) {
        this.adminRepository = adminRepository;
        this.tokenRepository = tokenRepository;
    }

    public void addAdmin( Admin admin ) {
        Optional<Admin> adminOptional = adminRepository.findByEmail( admin.getEmail() );
        if ( adminOptional.isPresent() ) {
            throw new IllegalStateException("Admin exists!" );
        }
        hashingPasswordHelper.setPassword(admin.getHashedPassword());
        admin.setHashedPassword( hashingPasswordHelper.Hash() );
        adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById( Long id) {
        Optional<Admin> adminOptional = adminRepository.findById( id );
        if ( !adminOptional.isPresent() ){
            throw new IllegalStateException("The admin with id  "+ id + " doesn't exist.");
        }
        return adminOptional.get();
    }


    public void changeAdminPassword( String newPassword,  Long adminId) {
        Optional<Admin> adminOptional = adminRepository.findById( adminId );
        if ( !adminOptional.isPresent() ){
            throw new IllegalStateException("The admin with id  "+ adminId + " doesn't exist.");
        }
       hashingPasswordHelper.setPassword(newPassword);
       adminOptional.get().setHashedPassword(hashingPasswordHelper.Hash());
       adminRepository.save(adminOptional.get());
    }

    public void deleteAdminById( Long id ) {
        Optional<Admin> adminOptional = adminRepository.findById( id );
        if ( !adminOptional.isPresent() ){
            throw new IllegalStateException("The admin with id  "+ id + " doesn't exist.");
        }
        adminRepository.deleteById(id);

    }

    public String login( String password, String email ) {
        Optional<Admin> adminOptional = adminRepository.findByEmail( email );
        if ( !adminOptional.isPresent() ){
            throw new IllegalStateException("The admin with email  "+ email + " doesn't exist.");
        }

        Admin logger = adminOptional.get();
        hashingPasswordHelper.setPassword(password);
        if ( logger.getHashedPassword().equals(hashingPasswordHelper.Hash())) {
            //Token handling
            Token adminToken = new Token();
            String token = adminToken.generateToken();
            adminToken.setIsActivelyUsed(true);
            adminToken.setLastActive(LocalDateTime.now());
            tokenRepository.save(adminToken);

            logger.setToken(adminToken);
            adminRepository.save(logger);
            //To see token ID:
            System.out.println(adminToken.getID());
            return token;
        }
        else {
            return "Incorrect login credentials!";
        }
    }

    public String logout( Long id) {
        Optional<Admin> adminOptional = adminRepository.findById( id );
        if ( !adminOptional.isPresent() ){
            throw new IllegalStateException("The admin with id  "+ id + " doesn't exist.");
        }
        Admin logger = adminOptional.get();
        logger.getToken().setLastActive(LocalDateTime.now());
        logger.getToken().setIsActivelyUsed(false);
        adminRepository.save(logger);
        tokenRepository.save(logger.getToken());
        return "Admin with ID " + id + " successfully logged out";
    }
}

