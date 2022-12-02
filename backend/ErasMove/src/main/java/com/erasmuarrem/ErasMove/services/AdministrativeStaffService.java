package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministrativeStaffService {

    private final AdministrativeStaffRepository administrativeStaffRepository;

    @Autowired
    public AdministrativeStaffService( AdministrativeStaffRepository administrativeStaffRepository) {
        this.administrativeStaffRepository = administrativeStaffRepository;
    }

}
