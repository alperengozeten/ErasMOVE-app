package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministrativeStaffService {

    private final AdministrativeStaffRepository administrativeStaffRepository;

    @Autowired
    public AdministrativeStaffService( AdministrativeStaffRepository administrativeStaffRepository) {
        this.administrativeStaffRepository = administrativeStaffRepository;
    }

    public void addAdministrativeStaff(AdministrativeStaff administrativeStaff) {
        administrativeStaffRepository.save(administrativeStaff);
    }

    public List<AdministrativeStaff> getAdministrativeStaffs() {
        return administrativeStaffRepository.findAll();
    }

    public AdministrativeStaff getAdministrativeStaff(Long id) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findById(id);
        
        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative Staff with id:" + id + " doesn't exist!");
        }
        
        return administrativeStaffOptional.get();
    }

    public void deleteAdministrativeStaff(Long id) {
        administrativeStaffRepository.deleteById(id);
    }

    public AdministrativeStaff getAdministrativeStaffByDepartmentId(Long id) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByDepartments_ID(id);

        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative staff with department id:" + id + " doesn't exist!");
        }

        return administrativeStaffOptional.get();
    }
}
