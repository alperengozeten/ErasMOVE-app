package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ErasmusUniversityDepartment;
import com.erasmuarrem.ErasMove.repositories.ErasmusUniversityDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ErasmusUniversityDepartmentService {

    private final ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository;

    @Autowired
    public ErasmusUniversityDepartmentService(ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository) {
        this.erasmusUniversityDepartmentRepository = erasmusUniversityDepartmentRepository;
    }

    public List<ErasmusUniversityDepartment> getErasmusUniversityDepartments() {
        return erasmusUniversityDepartmentRepository.findAll();
    }

    public ErasmusUniversityDepartment getErasmusUniversityDepartmentByID(Long id) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        return erasmusUniversityDepartmentOptional.get();
    }

    public void addErasmusUniversityDepartment(ErasmusUniversityDepartment erasmusUniversityDepartment) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findByErasmusUniversityIDAndDepartmentName(erasmusUniversityDepartment.getErasmusUniversity().getID(),
                        erasmusUniversityDepartment.getDepartmentName());

        if ( erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with name:" + erasmusUniversityDepartment.getDepartmentName() +
                    " alredy exists in university with id:" + erasmusUniversityDepartment.getErasmusUniversity().getID());
        }

        erasmusUniversityDepartmentRepository.save(erasmusUniversityDepartment);
    }

    public void deleteErasmusUniversityDepartmentByID(Long id) {
        Optional<ErasmusUniversityDepartment> erasmusUniversityDepartmentOptional = erasmusUniversityDepartmentRepository
                .findById(id);

        if ( !erasmusUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Erasmus University Department with id:" + id + " doesn't exist!");
        }

        erasmusUniversityDepartmentRepository.deleteById(id);
    }
}
