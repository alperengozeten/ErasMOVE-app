package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id: " + id + " doesn't exist!");
        }

        return departmentOptional.get();
    }

    public void addDepartment(Department department) {
        Optional<Department> departmentOptional = departmentRepository.findByDepartmentName(department.getDepartmentName());

        // this check should only be done for the host university, there shouldn't be a check for the
        // erasmusDepartments or exchangeDepartments
        if ( departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with name:" + department.getDepartmentName() + " already exists" +
                    "for the host university!");
        }

        departmentRepository.save(department);
    }

    public Department getDepartmentByCourseId(Long id) {
        Optional<Department> departmentOptional = departmentRepository.findByCourseList_ID(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department containing course with id:" + id + " doesn't exist!");
        }

        return departmentOptional.get();
    }

    public void deleteDepartmentById(Long id) {
        Optional<Department> departmentOptional = departmentRepository.findById(id);

        if ( !departmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with id:" + id + " doesn't exist!");
        }

        departmentRepository.deleteById(id);
    }
}
