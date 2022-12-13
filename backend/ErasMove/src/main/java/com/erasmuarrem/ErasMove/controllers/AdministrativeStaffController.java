package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.models.ApplicationWrapper;
import com.erasmuarrem.ErasMove.services.AdministrativeStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> addAdministrativeStaff(@RequestBody AdministrativeStaff administrativeStaff) {
        return administrativeStaffService.addAdministrativeStaff(administrativeStaff);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdministrativeStaff(@PathVariable("id") Long id) {
        administrativeStaffService.deleteAdministrativeStaff(id);
    }

    @PostMapping("/addOutgoingStudents")
    public ResponseEntity<String> addOutgoingStudents(@RequestParam boolean isErasmus, @RequestParam Long departmentId, @RequestBody List<ApplicationWrapper> applicationWrapperList ) {
       return administrativeStaffService.addStudents(isErasmus, departmentId, applicationWrapperList);
    }
}
