package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Language;
import com.erasmuarrem.ErasMove.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;

    @Autowired
    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }

    public Language getLanguageByID(Long id) {
        Optional<Language> languageOptional = languageRepository.findById(id);

        if ( !languageOptional.isPresent() ) {
            throw new IllegalStateException("Language with id:" + id + " doesn't exist!");
        }

        return languageOptional.get();
    }

    public void addLanguage(Language language) {
        Long outgoingStudentID = language.getOutgoingStudent().getID();
        String languageName = language.getLanguage();

        Optional<Language> languageOptional = languageRepository.findByOutgoingStudentIDAndLanguage(
                outgoingStudentID,
                languageName
        );

        if ( languageOptional.isPresent() ) {
            throw new IllegalStateException("Language with name:" + languageName +
                    " already exists for outgoingStudent with id:" + outgoingStudentID + "!");
        }

        languageRepository.save(language);
    }

    public void deleteLanguageByID(Long id) {
        Optional<Language> languageOptional = languageRepository.findById(id);

        if ( !languageOptional.isPresent() ) {
            throw new IllegalStateException("Language with id:" + id + " doesn't exist!");
        }

        languageRepository.deleteById(id);
    }

    public List<Language> getLanguagesByOutgoingStudentID(Long id) {
        return languageRepository.findByOutgoingStudentID(id);
    }

    public Language getLanguagesByOutgoingStudentIDAndLanguageName(Long outgoingStudentID, String languageName) {
        Optional<Language> languageOptional = languageRepository.findByOutgoingStudentIDAndLanguage(
                outgoingStudentID,
                languageName
        );

        if ( !languageOptional.isPresent() ) {
            throw new IllegalStateException("Language with name:" + languageName +
                    " doesn't exist for outgoingStudent with id:" + outgoingStudentID + "!");
        }

        return languageOptional.get();
    }
}
