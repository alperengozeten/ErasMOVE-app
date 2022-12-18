package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.ContractedUniversity;
import com.erasmuarrem.ErasMove.models.Language;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.services.LanguageService;
import com.erasmuarrem.ErasMove.services.OutgoingStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/outgoingStudent")
@CrossOrigin
public class OutgoingStudentController {

    private final OutgoingStudentService outgoingStudentService;
    private final LanguageService languageService;

    @Autowired
    public OutgoingStudentController(OutgoingStudentService outgoingStudentService, LanguageService languageService) {
        this.outgoingStudentService = outgoingStudentService;
        this.languageService = languageService;
    }

    @GetMapping
    public List<OutgoingStudent> getStudents() {
        return outgoingStudentService.getStudents();
    }

    @GetMapping("/{id}")
    public OutgoingStudent getStudent(@PathVariable("id") Long id) {
        return outgoingStudentService.getStudentByID(id).orElse(null);
    }

    @GetMapping("/acceptedUniversity/{outgoingStudentID}")
    public ResponseEntity<ContractedUniversity> getAcceptedUniversityByOutgoingStudentID(@PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return outgoingStudentService.getAcceptedUniversityByOutgoingStudentID(outgoingStudentID);
    }

    @PostMapping("/add")
    public void addOutgoingStudent(@RequestBody OutgoingStudent outgoingStudent) {
        outgoingStudentService.addOutgoingStudent(outgoingStudent);
    }

    @DeleteMapping("/cancelPlacement/{outgoingStudentID}")
    public String cancelPlacementByOutgoingStudentID(@PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return outgoingStudentService.cancelPlacementByOutgoingStudentID(outgoingStudentID);
    }

    // LANGUAGES
    @GetMapping("/language")
    public List<Language> getLanguages() {
        return languageService.getLanguages();
    }

    @GetMapping("/language/{id}")
    public Language getLanguageByID(@PathVariable("id") Long id) {
        return languageService.getLanguageByID(id);
    }

    @GetMapping("/language/outgoingStudent/{id}")
    public List<Language> getLanguagesByOutgoingStudentID(@PathVariable("id") Long id) {
        return languageService.getLanguagesByOutgoingStudentID(id);
    }

    @GetMapping("/language/outgoingStudent/{id}/language/{name}")
    public Language getLanguageByOutgoingStudentIDAndLanguageName(
            @PathVariable("id") Long outgoingStudentID,
            @PathVariable("name") String languageName) {
        return languageService.getLanguagesByOutgoingStudentIDAndLanguageName(
                outgoingStudentID,
                languageName
        );
    }

    @PostMapping("/language/add")
    public ResponseEntity<String> addLanguage(@RequestBody Language language) {
        return languageService.addLanguage(language);
    }

    @DeleteMapping("/language/delete/{id}")
    public void deleteLanguageByID(@PathVariable("id") Long id) {
        languageService.deleteLanguageByID(id);
    }
}
