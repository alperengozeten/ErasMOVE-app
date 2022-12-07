package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Admin;
import com.erasmuarrem.ErasMove.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/add")
    public void addAdmin(@RequestBody Admin admin ) {
        adminService.addAdmin(admin);
    }

    @PatchMapping("/changePassword/{id}")
    public void changeAdminPassword( @RequestParam String newPassword, @PathVariable Long id ) {
        adminService.changeAdminPassword( newPassword, id);
    }

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
