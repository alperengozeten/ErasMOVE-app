package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
import com.erasmuarrem.ErasMove.services.DepartmentCoordinatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departmentCoordinator")
@CrossOrigin
public class DepartmentCoordinatorController {

    private final DepartmentCoordinatorService departmentCoordinatorService;

    @Autowired
    public DepartmentCoordinatorController(DepartmentCoordinatorService departmentCoordinatorService) {
        this.departmentCoordinatorService = departmentCoordinatorService;
    }

    @GetMapping()
    public List<DepartmentCoordinator> getDepartmentCoordinators() {
        return departmentCoordinatorService.getDepartmentCoordinators();
    }

    @GetMapping("/{id}")
    public DepartmentCoordinator getDepartmentCoordinatorById(@PathVariable("id") Long id) {
        return departmentCoordinatorService.getDepartmentCoordinatorById(id);
    }

    @GetMapping("/department/{id}")
    public DepartmentCoordinator getDepartmentCoordinatorByDepartmentId(@PathVariable("id") Long id) {
        return departmentCoordinatorService.getDepartmentCoordinatorByDepartmentId(id);
    }

    @PostMapping("/add")
    public void addDepartmentCoordinator(@RequestBody DepartmentCoordinator departmentCoordinator) {
        departmentCoordinatorService.addDepartmentCoordinator(departmentCoordinator);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteDepartmentCoordinatorById(@PathVariable("id") Long id) {
        departmentCoordinatorService.deleteDepartmentCoordinatorById(id);
    }
}
