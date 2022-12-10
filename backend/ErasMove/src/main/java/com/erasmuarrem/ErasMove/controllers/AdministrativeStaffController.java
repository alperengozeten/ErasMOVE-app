package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.services.AdministrativeStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrativeStaff")
public class AdministrativeStaffController {

    private final AdministrativeStaffService administrativeStaffService;

    @Autowired
    public AdministrativeStaffController( AdministrativeStaffService administrativeStaffService ) {
        this.administrativeStaffService = administrativeStaffService;
    }

    @PostMapping("/add")
    public void addAdministrativeStaff(@RequestParam String adminToken, @RequestBody AdministrativeStaff administrativeStaff) {
        administrativeStaffService.addAdministrativeStaff(adminToken, administrativeStaff);
    }

    @GetMapping()
    public List<AdministrativeStaff> getAdministrativeStaffs() {
        return administrativeStaffService.getAdministrativeStaffs();
    }

    @GetMapping("/{id}")
    public AdministrativeStaff getAdministrativeStaffById(@PathVariable("id") Long id) {
        return administrativeStaffService.getAdministrativeStaff(id);
    }

    @GetMapping("/department/{id}")
    public AdministrativeStaff getAdministrativeStaffByDepartmentId(@PathVariable("id") Long id) {
        return administrativeStaffService.getAdministrativeStaffByDepartmentId(id);
    }

    @GetMapping("/departmentName/{departmentName}")
    public AdministrativeStaff getAdministrativeStaffByDepartmentName(@PathVariable("departmentName") String departmentName) {
        return administrativeStaffService.getAdministrativeStaffByDepartmentName(departmentName);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdministrativeStaff(@PathVariable("id") Long id) {
        administrativeStaffService.deleteAdministrativeStaff(id);
    }
    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password ) {
        return administrativeStaffService.login(email,password);
    }

    @PostMapping("/logout/{id}")
    public String logOut(@PathVariable("id") Long id) {
        return administrativeStaffService.logOut(id);
    }

    @PatchMapping("/changePassword")
    public void changePassword( @RequestParam String email, @RequestParam String newPass, @RequestParam String oldPass) {
        administrativeStaffService.changePasswordByEmail(email,newPass, oldPass);
    }
}
