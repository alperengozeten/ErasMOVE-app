package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Department;
import com.erasmuarrem.ErasMove.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping()
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }

    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable("id") Long id) {
        return departmentService.getDepartmentById(id);
    }

    @GetMapping("/course/{id}")
    public Department getDepartmentByCourseId(@PathVariable("id") Long id) {
        return departmentService.getDepartmentByCourseId(id);
    }

    @PostMapping("/add")
    public void addDepartment(@RequestBody Department department) {
        departmentService.addDepartment(department);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDepartment(@PathVariable("id") Long id) {
        departmentService.deleteDepartmentById(id);
    }
}
