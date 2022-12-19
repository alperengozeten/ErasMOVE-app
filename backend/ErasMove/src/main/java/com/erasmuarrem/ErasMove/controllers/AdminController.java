package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for the admin
 */
@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * method to create an admin
     * @param admin the admin object
     */
    @PostMapping("/add")
    public void addAdmin(@RequestBody Admin admin ) {
        adminService.addAdmin(admin);
    }

    /**
     * Method to change password for the admin
     * @param newPassword string
     * @param id Long
     */
    @PatchMapping("/changePassword/{id}")
    public void changeAdminPassword( @RequestParam String newPassword, @PathVariable Long id ) {
        adminService.changeAdminPassword( newPassword, id);
    }

    /**
     * Method that returns the list of all admins
     * @return List<Admin> all admins
     */
    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping ("/{id}")
    public Admin getAdminById(@PathVariable("id") Long adminID ) {
        return adminService.getAdminById(adminID);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdminById( @PathVariable("id") Long id) {
        adminService.deleteAdminById(id);
    }

    @PostMapping("/login")
    public String login( @RequestParam String password,@RequestParam String email) {
        return adminService.login(password, email);
    }

    @PostMapping("/logout/{id}")
    public String logout(@PathVariable("id") Long id) {
        return adminService.logout(id);
    }
}
