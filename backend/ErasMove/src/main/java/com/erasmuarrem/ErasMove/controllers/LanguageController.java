package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Language;
import com.erasmuarrem.ErasMove.services.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/language")
public class LanguageController {

    private final LanguageService languageService;

    @Autowired
    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping
    public List<Language> getLanguages() {
        return languageService.getLanguages();
    }

    @GetMapping("/{id}")
    public Language getLanguageByID(@PathVariable("id") Long id) {
        return languageService.getLanguageByID(id);
    }

    @GetMapping("/outgoingStudent/{id}")
    public List<Language> getLanguagesByOutgoingStudentID(@PathVariable("id") Long id) {
        return languageService.getLanguagesByOutgoingStudentID(id);
    }

    @GetMapping("/outgoingStudent/{id}/language/{name}")
    public Language getLanguageByOutgoingStudentIDAndLanguageName(
            @PathVariable("id") Long outgoingStudentID,
            @PathVariable("name") String languageName) {
        return languageService.getLanguagesByOutgoingStudentIDAndLanguageName(
                outgoingStudentID,
                languageName
        );
    }

    @PostMapping("/add")
    public void addLanguage(@RequestBody Language language) {
        languageService.addLanguage(language);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLanguageByID(@PathVariable("id") Long id) {
        languageService.deleteLanguageByID(id);
    }
}
