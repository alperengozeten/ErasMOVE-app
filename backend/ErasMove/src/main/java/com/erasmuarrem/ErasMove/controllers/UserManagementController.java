package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
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

    // OUTGOING STUDENT

    @PostMapping("/add/outgoingStudent")
    public void addOutgoingStudent(@RequestParam String adminToken, @RequestBody OutgoingStudent outgoingStudent) {
        userManagementService.addOutgoingStudent(adminToken,outgoingStudent);
    }

    @PostMapping("/login/outgoingStudent")
    public String loginOutgoingStudent(@RequestParam String email, @RequestParam String password ) {
        return userManagementService.loginOutgoingStudent(email,password);
    }

    @PostMapping("/logout/outgoingStudent/{id}")
    public String logOutOutgoingStudent(@PathVariable("id") Long id) {
        return userManagementService.logOutOutgoingStudent(id);
    }

    @PatchMapping("/changePassword/outgoingStudent")
    public void changePasswordOutgoingStudent( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        userManagementService.changePasswordByEmailOutgoingStudent(email,newPass, oldPass);
    }

    // DEPARTMENT COORDINATOR

    @PostMapping("/add/departmentCoordinator")
    public void addDepartmentCoordinator(@RequestParam String adminToken,@RequestBody DepartmentCoordinator departmentCoordinator) {
        userManagementService.addDepartmentCoordinator(adminToken,departmentCoordinator);
    }

    @PostMapping("/login/departmentCoordinator")
    public String loginDepartmentCoordinator(@RequestParam String email, @RequestParam String password ) {
        return userManagementService.loginDepartmentCoordinator(email,password);
    }

    @PostMapping("/logout/departmentCoordinator/{id}")
    public String logOut(@PathVariable("id") Long id) {
        return userManagementService.logOutDepartmentCoordinator(id);
    }

    @PatchMapping("/changePassword/departmentCoordinator")
    public void changePassword( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        userManagementService.changePasswordByEmailDepartmentCoordinator(email,newPass, oldPass);
    }
}