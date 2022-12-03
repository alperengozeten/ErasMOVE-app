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

    @PostMapping
    public void addAdministrativeStaff(@RequestBody AdministrativeStaff administrativeStaff) {
        administrativeStaffService.addAdministrativeStaff(administrativeStaff);
    }

    @GetMapping()
    public List<AdministrativeStaff> getAdministrativeStaffs() {
        return administrativeStaffService.getAdministrativeStaffs();
    }

    @GetMapping("/{id}")
    public AdministrativeStaff getAdministrativeStaffById(@PathVariable("id") Long id) {
        return administrativeStaffService.getAdministrativeStaff(id);
    }

    // add here get by department id

    @DeleteMapping("/delete/{id}")
    public void deleteAdministrativeStaff(@PathVariable("id") Long id) {
        administrativeStaffService.deleteAdministrativeStaff(id);
    }
}
