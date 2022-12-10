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

    @PostMapping("/add")
    public void addAdministrativeStaff(@RequestBody AdministrativeStaff administrativeStaff) {
        administrativeStaffService.addAdministrativeStaff(administrativeStaff);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdministrativeStaff(@PathVariable("id") Long id) {
        administrativeStaffService.deleteAdministrativeStaff(id);
    }
}
