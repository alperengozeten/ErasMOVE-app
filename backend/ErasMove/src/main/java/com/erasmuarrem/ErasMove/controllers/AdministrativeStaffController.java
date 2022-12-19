package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.AdministrativeStaff;
import com.erasmuarrem.ErasMove.models.ApplicationWrapper;
import com.erasmuarrem.ErasMove.services.AdministrativeStaffService;
import com.erasmuarrem.ErasMove.services.ErasmusReplacementRequestService;
import com.erasmuarrem.ErasMove.services.ExchangeReplacementRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This class is related to the Administrative Staff
 * and includes operations related to the placements and requests
 */
@RestController
@RequestMapping("/administrativeStaff")
@CrossOrigin
public class AdministrativeStaffController {
    private final AdministrativeStaffService administrativeStaffService;
    private final ExchangeReplacementRequestService exchangeReplacementRequestService;
    private final ErasmusReplacementRequestService erasmusReplacementRequestService;
    @Autowired
    public AdministrativeStaffController(AdministrativeStaffService administrativeStaffService, ExchangeReplacementRequestService exchangeReplacementRequestService, ErasmusReplacementRequestService erasmusReplacementRequestService) {
        this.administrativeStaffService = administrativeStaffService;
        this.exchangeReplacementRequestService = exchangeReplacementRequestService;
        this.erasmusReplacementRequestService = erasmusReplacementRequestService;
    }

    /**
     * Get all administrative staffs
     * @return List<AdministrativeStaff> all admin.staff
     */
    @GetMapping()
    public List<AdministrativeStaff> getAdministrativeStaffs() {
        return administrativeStaffService.getAdministrativeStaffs();
    }

    /**
     * Get administrative staff from the database with id
     * @param id Long
     * @return AdministrativeStaff
     */
    @GetMapping("/{id}")
    public AdministrativeStaff getAdministrativeStaffById(@PathVariable("id") Long id) {
        return administrativeStaffService.getAdministrativeStaff(id);
    }

    /**
     * Get administrative staff by department id
     * @param id Long
     * @return AdministrativeStaff
     */
    @GetMapping("/department/{id}")
    public AdministrativeStaff getAdministrativeStaffByDepartmentId(@PathVariable("id") Long id) {
        return administrativeStaffService.getAdministrativeStaffByDepartmentId(id);
    }

    /**
     * Get administrative staff by department name
     * @param departmentName String
     * @return AdministrativeStaff
     */
    @GetMapping("/departmentName/{departmentName}")
    public AdministrativeStaff getAdministrativeStaffByDepartmentName(@PathVariable("departmentName") String departmentName) {
        return administrativeStaffService.getAdministrativeStaffByDepartmentName(departmentName);
    }

    /**
     * add administrative staff
     * @param administrativeStaff AdministrativeStaff
     * @return response
     */
    @PostMapping("/add")
    public ResponseEntity<String> addAdministrativeStaff(@RequestBody AdministrativeStaff administrativeStaff) {
        return administrativeStaffService.addAdministrativeStaff(administrativeStaff);
    }

    /**
     * create replacement proposals for the department coordinator to accept or decline
     * @param departmentID Long
     */
    @PostMapping("/makeErasmusProposal/{departmentID}")
    public void makeProposals(@PathVariable("departmentID") Long departmentID) {
        erasmusReplacementRequestService.makeErasmusProposalsToDepartmentCoordinator(departmentID);
    }

    /**
     * create exchange replacement proposals for the department coordinator to accept or decline
     */
    @PostMapping("/makeExchangeProposal")
    public void makeProposals() {
        exchangeReplacementRequestService.makeExchangeProposalsToDepartmentCoordinators();
    }

    /**
     * delete administrative staff by id
     * @param id Long
     */
    @DeleteMapping("/delete/{id}")
    public void deleteAdministrativeStaff(@PathVariable("id") Long id) {
        administrativeStaffService.deleteAdministrativeStaff(id);
    }

    /**
     * add all outgoing students where the data is parsed from the excel file
     * @param isErasmus Boolean
     * @param departmentId Long
     * @param applicationWrapperList List<ApplicationWrapper>
     * @return response
     */
    @PostMapping("/addOutgoingStudents")
    public ResponseEntity<String> addOutgoingStudents(@RequestParam boolean isErasmus, @RequestParam Long departmentId, @RequestBody List<ApplicationWrapper> applicationWrapperList ) {
       return administrativeStaffService.addStudents(isErasmus, departmentId, applicationWrapperList);
    }

    /**
     * place erasmus students by departmentID
     * @param departmentID Long
     */
    @PostMapping("/erasmus/place")
    public void placeErasmusStudents(@RequestParam Long departmentID ) {
        administrativeStaffService.placeErasmusStudents(departmentID);
    }

    /**
     * place exchange students
     */
    @PostMapping("/exchange/place")
    public void placeExchangeStudent() {
        administrativeStaffService.placeExchangeStudents();
    }
}
