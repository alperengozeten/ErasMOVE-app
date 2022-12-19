package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.DepartmentCoordinator;
import com.erasmuarrem.ErasMove.services.DepartmentCoordinatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * this is a controller class for managing the operations related to the department coordinator
 */
@RestController
@RequestMapping("/departmentCoordinator")
@CrossOrigin
public class DepartmentCoordinatorController {

    private final DepartmentCoordinatorService departmentCoordinatorService;

    @Autowired
    public DepartmentCoordinatorController(DepartmentCoordinatorService departmentCoordinatorService) {
        this.departmentCoordinatorService = departmentCoordinatorService;
    }

    /**
     * this method fetches all department coordinators from the database
     * @return List<DepartmentCoordinator>
     */
    @GetMapping()
    public List<DepartmentCoordinator> getDepartmentCoordinators() {
        return departmentCoordinatorService.getDepartmentCoordinators();
    }

    /**
     * this method fetches a department coordinator with a given id
     * @param id Long
     * @return DepartmentCoordinator
     */
    @GetMapping("/{id}")
    public DepartmentCoordinator getDepartmentCoordinatorById(@PathVariable("id") Long id) {
        return departmentCoordinatorService.getDepartmentCoordinatorById(id);
    }

    /**
     * This method fetches a DepartmentCoordinator with a given departmentID
     * @param id Long
     * @return DepartmentCoordinator
     */
    @GetMapping("/department/{id}")
    public DepartmentCoordinator getDepartmentCoordinatorByDepartmentId(@PathVariable("id") Long id) {
        return departmentCoordinatorService.getDepartmentCoordinatorByDepartmentId(id);
    }

    /**
     * this method adds a new Department Coordinator to the database
     * @param departmentCoordinator DepartmentCoordinator
     */
    @PostMapping("/add")
    public void addDepartmentCoordinator(@RequestBody DepartmentCoordinator departmentCoordinator) {
        departmentCoordinatorService.addDepartmentCoordinator(departmentCoordinator);
    }

    /**
     * this method deletes a department coordinator with a given id
     * @param id Long
     */
    @DeleteMapping("/delete/{id}")
    public void deleteDepartmentCoordinatorById(@PathVariable("id") Long id) {
        departmentCoordinatorService.deleteDepartmentCoordinatorById(id);
    }
}
