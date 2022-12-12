package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.services.UserManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserManagementController {

    private final UserManagementService userManagementService;
    public UserManagementController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @GetMapping
    public List<ApplicationUser> getAllUsers() {
        return userManagementService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ApplicationUser getUserById(@PathVariable("id") Long id) {
        return userManagementService.getUserById(id);
    }

    // OUTGOING STUDENT

    @PostMapping("/add/outgoingStudent")
    public ResponseEntity<String> addOutgoingStudent(@RequestParam String adminToken, @RequestBody OutgoingStudent outgoingStudent) {
        return userManagementService.addOutgoingStudent(adminToken,outgoingStudent);
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
    public ResponseEntity<String> changePasswordOutgoingStudent( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        return userManagementService.changePasswordByEmailOutgoingStudent(email,newPass, oldPass);
    }

    // DEPARTMENT COORDINATOR

    @PostMapping("/add/departmentCoordinator")
    public ResponseEntity<String> addDepartmentCoordinator(@RequestParam String adminToken,@RequestBody DepartmentCoordinator departmentCoordinator) {
        return userManagementService.addDepartmentCoordinator(adminToken,departmentCoordinator);
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
    public ResponseEntity<String> changePassword( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        return userManagementService.changePasswordByEmailDepartmentCoordinator(email,newPass, oldPass);
    }

    // ADMINISTRATIVE STAFF

    @PostMapping("/add/administrativeStaff")
    public ResponseEntity<String> addAdministrativeStaff(@RequestParam String adminToken, @RequestBody AdministrativeStaff administrativeStaff) {
        return userManagementService.addAdministrativeStaff(adminToken, administrativeStaff);
    }

    @PostMapping("/login/administrativeStaff")
    public String loginAdministrativeStaff(@RequestParam String email, @RequestParam String password ) {
        return userManagementService.loginAdministrativeStaff(email,password);
    }

    @PostMapping("/logout/administrativeStaff/{id}")
    public String logOutAdministrativeStaff(@PathVariable("id") Long id) {
        return userManagementService.logOutAdministrativeStaff(id);
    }

    @PatchMapping("/changePassword/administrativeStaff")
    public ResponseEntity<String> changePasswordAdministrativeStaff( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        return userManagementService.changePasswordByEmailAdministrativeStaff(email,newPass, oldPass);
    }

    // INCOMING STUDENT

    @PostMapping("/add/incomingStudent")
    public ResponseEntity<String> addIncomingStudent(@RequestParam String adminToken,@RequestBody IncomingStudent incomingStudent ) {
       return userManagementService.addIncomingStudent(adminToken, incomingStudent);
    }

    @PostMapping("/login/incomingStudent")
    public String loginIncomingStudent(@RequestParam String email, @RequestParam String password ) {
        return userManagementService.loginIncomingStudent(email,password);
    }

    @PostMapping("/logout/incomingStudent/{id}")
    public String logOutIncomingStudent(@PathVariable("id") Long id) {
        return userManagementService.logOutIncomingStudent(id);
    }

    @PatchMapping("/changePassword/incomingStudent")
    public ResponseEntity<String> changePasswordIncomingStudent( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        return userManagementService.changePasswordByEmailIncomingStudent(email,newPass, oldPass);
    }

    //Course Coordinator
    @PostMapping("/add/courseCoordinator")
    public ResponseEntity<String> addCourseCoordinator(@RequestParam String adminToken, @RequestBody CourseCoordinator courseCoordinator ) {
        return userManagementService.addCourseCoordinator(adminToken, courseCoordinator);
    }

    @PostMapping("/login/courseCoordinator")
    public String loginCourseCoordinator(@RequestParam String email, @RequestParam String password ) {
        return userManagementService.loginCourseCoordinator(email,password);
    }

    @PostMapping("/logout/courseCoordinator/{id}")
    public String logoutCourseCoordinator(@PathVariable("id") Long id) {
        return userManagementService.logoutCourseCoordinator(id);
    }

    @PatchMapping("/changePassword/courseCoordinator")
    public ResponseEntity<String> changePasswordCourseCoordinator( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        return userManagementService.changePasswordByCourseCoordinator(email,newPass, oldPass);
    }

    //FORGOT PASSWORD IMPLEMENTATION
    @PostMapping("/sendCode")
    public String sendActivationCode(@RequestParam String email) {
        return userManagementService.sendActivationCode(email);
    }
    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestParam String email, @RequestParam String activationCode, @RequestParam String newPassword) {
        return userManagementService.forgotPassword(email, activationCode, newPassword);
    }

}
