package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministrativeStaffService {

    private final AdministrativeStaffRepository administrativeStaffRepository;

    @Autowired
    public AdministrativeStaffService(AdministrativeStaffRepository administrativeStaffRepository) {
        this.administrativeStaffRepository = administrativeStaffRepository;
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

        return administrativeStaffOptional.orElse(null);
    }

    public AdministrativeStaff getAdministrativeStaffByDepartmentName(String departmentName) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository
                .findByDepartments_DepartmentName(departmentName);

        if ( !administrativeStaffOptional.isPresent() ) {
            throw new IllegalStateException("Administrative Staff with department:" + departmentName + " doesn't exist!");
        }

        return administrativeStaffOptional.get();
    }

    public ResponseEntity<String> addAdministrativeStaff(AdministrativeStaff administrativeStaff) {
        Optional<AdministrativeStaff> administrativeStaffOptional = administrativeStaffRepository.findByEmail(administrativeStaff.getEmail());

        if ( administrativeStaffOptional.isPresent() ) {
            return new ResponseEntity<>("The Administrative Staff with email " + administrativeStaff.getEmail() + " already exists!", HttpStatus.BAD_REQUEST);
        }

        List<Department> departmentList = administrativeStaff.getDepartments();

        for (Department department : departmentList) {
            Optional<AdministrativeStaff> optionalAdministrativeStaff = administrativeStaffRepository
                    .findByDepartments_ID(department.getID());

            if ( optionalAdministrativeStaff.isPresent() ) {
                return new ResponseEntity<>("There is already an Administrative Staff for Department with id:" + department.getID() + "!", HttpStatus.BAD_REQUEST);
            }
        }

        administrativeStaffRepository.save(administrativeStaff);
        return new ResponseEntity<>("Administrative Staff created!", HttpStatus.OK);
    }
}
