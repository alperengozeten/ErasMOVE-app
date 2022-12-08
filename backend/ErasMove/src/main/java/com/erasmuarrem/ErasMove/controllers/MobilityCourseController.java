package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.MobilityCourse;
import com.erasmuarrem.ErasMove.services.MobilityCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mobilityCourse")
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
    public MobilityCourse getMobilityCourseByPreApprovalFormRequestID(@PathVariable("id") Long preApprovalFormRequestID) {
        return mobilityCourseService.getMobilityCourseByPreApprovalFormRequestID(preApprovalFormRequestID);
    }


    @PostMapping("/add")
    public void addMobilityCourse(@RequestBody MobilityCourse mobilityCourse) {
        mobilityCourseService.addMobilityCourse(mobilityCourse);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMobilityCourseByID(@PathVariable("id") Long id) {
        mobilityCourseService.deleteMobilityCourseByID(id);
    }

    @DeleteMapping("/delete/preApprovalForm/{preApprovalFormID}")
    public void deleteMobilityCourseByPreApprovalFormID(@PathVariable("preApprovalFormID") Long preApprovalFormID) {
        mobilityCourseService.deleteMobilityCourseByPreApprovalFormRequestID(preApprovalFormID);
    }
}
