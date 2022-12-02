package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.services.AdministrativeStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/administrativeStaff")
public class AdministrativeStaffController {

    private final AdministrativeStaffService administrativeStaffService;

    @Autowired
    public AdministrativeStaffController( AdministrativeStaffService administrativeStaffService ) {
        this.administrativeStaffService = administrativeStaffService;
    }
}
