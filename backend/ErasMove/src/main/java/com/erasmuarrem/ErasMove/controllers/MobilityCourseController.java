package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.MobilityCourse;
import com.erasmuarrem.ErasMove.services.MobilityCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mobilityCourse")
@CrossOrigin
public class MobilityCourseController {

    private final MobilityCourseService mobilityCourseService;

    @Autowired
    public MobilityCourseController(MobilityCourseService mobilityCourseService) {
        this.mobilityCourseService = mobilityCourseService;
    }

    @GetMapping
    public List<MobilityCourse> getMobilityCourses() {
        return mobilityCourseService.getMobilityCourses();
    }

    @GetMapping("/{id}")
    public MobilityCourse getMobilityCourseByID(@PathVariable("id") Long id) {
        return mobilityCourseService.getMobilityCourseByID(id);
    }

    @GetMapping("/preApprovalForm/{id}")
    public List<MobilityCourse> getMobilityCoursesByPreApprovalFormRequestID(@PathVariable("id") Long preApprovalFormRequestID) {
        return mobilityCourseService.getMobilityCoursesByPreApprovalFormRequestID(preApprovalFormRequestID);
    }


    @PostMapping("/add")
    public ResponseEntity<String> addMobilityCourse(@RequestBody MobilityCourse mobilityCourse) {
        return mobilityCourseService.addMobilityCourse(mobilityCourse);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMobilityCourseByID(@PathVariable("id") Long id) {
        mobilityCourseService.deleteMobilityCourseByID(id);
    }

    @DeleteMapping("/delete/preApprovalForm/{preApprovalFormID}")
    public ResponseEntity<String> deleteMobilityCoursesByPreApprovalFormRequestID(@PathVariable("preApprovalFormID") Long preApprovalFormID) {
        return mobilityCourseService.deleteMobilityCoursesByPreApprovalFormRequestID(preApprovalFormID);
    }
}
