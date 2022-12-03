package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentCoordinatorService {

    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;

    @Autowired
    public DepartmentCoordinatorService(DepartmentCoordinatorRepository departmentCoordinatorRepository) {
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
    }

    public List<DepartmentCoordinator> getDepartmentCoordinators() {
        return departmentCoordinatorRepository.findAll();
    }

    public DepartmentCoordinator getDepartmentCoordinatorById(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findById(id);

        if ( !departmentCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Department Coordinator with id: " + id + " doesn't exist!");
        }

        return departmentCoordinatorOptional.get();
    }

    public void addDepartmentCoordinator(DepartmentCoordinator departmentCoordinator) {
        departmentCoordinatorRepository.save(departmentCoordinator);
    }

    public DepartmentCoordinator getDepartmentCoordinatorByDepartmentId(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findByDepartmentID(id);

        if ( !departmentCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Department Coordinator with department id:" + id + " doesn't exist!");
        }

        return departmentCoordinatorOptional.get();
    }

    public void deleteDepartmentCoordinatorById(Long id) {
        Optional<DepartmentCoordinator> departmentCoordinatorOptional = departmentCoordinatorRepository.findById(id);

        if ( !departmentCoordinatorOptional.isPresent() ) {
            throw new IllegalStateException("Department Coordinator with id:" + id + " doesn't exist!");
        }

        departmentCoordinatorRepository.deleteById(id);
    }
}
