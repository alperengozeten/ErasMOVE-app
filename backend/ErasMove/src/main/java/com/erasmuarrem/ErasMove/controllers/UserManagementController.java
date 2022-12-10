package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.UserManagementService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserManagementController {

    private final UserManagementService userManagementService;

    public UserManagementController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @PostMapping("/addOutgoingStudent")
    public void addOutgoingStudent(@RequestParam String adminToken, @RequestBody OutgoingStudent outgoingStudent) {
        userManagementService.addOutgoingStudent(adminToken,outgoingStudent);
    }

    @PostMapping("/login/outgoingStudent")
    public String login(@RequestParam String email, @RequestParam String password ) {
        return userManagementService.loginOutgoingStudent(email,password);
    }

    @PostMapping("/logout/outgoingStudent/{id}")
    public String logOut(@PathVariable("id") Long id) {
        return userManagementService.logOutOutgoingStudent(id);
    }

    @PatchMapping("/changePassword/outgoingStudent")
    public void changePassword( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        userManagementService.changePasswordByEmailOutgoingStudent(email,newPass, oldPass);
    }
}
