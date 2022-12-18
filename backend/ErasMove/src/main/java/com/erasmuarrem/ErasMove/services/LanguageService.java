package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.LanguageRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ExchangeUniversityService exchangeUniversityService;
    private final ApplicationService applicationService;
    private final NotificationService notificationService;

    @Autowired
    public LanguageService(LanguageRepository languageRepository, OutgoingStudentRepository outgoingStudentRepository, ErasmusUniversityService erasmusUniversityService, ExchangeUniversityService exchangeUniversityService, ApplicationService applicationService, NotificationService notificationService) {
        this.languageRepository = languageRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.erasmusUniversityService = erasmusUniversityService;
        this.exchangeUniversityService = exchangeUniversityService;
        this.applicationService = applicationService;
        this.notificationService = notificationService;
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

    public ResponseEntity<String> addLanguage(Language language) {
        Long outgoingStudentID = language.getOutgoingStudent().getID();
        String languageName = language.getLanguage();
        String languageLevel = language.getLevel();

        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findById(outgoingStudentID);

        if ( !outgoingStudentOptional.isPresent() ) {
            return new ResponseEntity<>("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        Optional<Language> languageOptional = languageRepository.findByOutgoingStudentIDAndLanguage(
                outgoingStudentID,
                languageName
        );

        if ( languageOptional.isPresent() ) {
            return new ResponseEntity<>("Language with name:" + languageName +
                    " already exists for outgoingStudent with id:" + outgoingStudentID + "!", HttpStatus.BAD_REQUEST);
        }

        if ( languageLevel.length() > 2 || !Character.isDigit(languageLevel.charAt(1)) || !Character.isAlphabetic(languageLevel.charAt(0)) ) {
            return new ResponseEntity<>("Incorrect format for the language level! Please use the format XX!", HttpStatus.BAD_REQUEST);
        }

        Application application = applicationService.getByOutgoingStudentID(outgoingStudentID);

        if ( application == null ) {
            return new ResponseEntity<>("Student with id:" + outgoingStudentID + " doesn't currently have an application!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentOptional.get();
        ContractedUniversity acceptedUniversity = null;

        if ( outgoingStudent.getIsErasmus() ) {
             acceptedUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);
        }
        else {
            acceptedUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);
        }

        if ( acceptedUniversity.getLanguageRequirement() == null ) {
            return new ResponseEntity<>("There is no language requirement for the university:" + acceptedUniversity.getUniversityName() + "!", HttpStatus.BAD_REQUEST);
        }

        Language universityLanguage = acceptedUniversity.getLanguageRequirement();

        if ( universityLanguage.getLevel().charAt(0) > languageLevel.charAt(0) ) {
            application.setLanguageStatus("Your language level:" + languageLevel + " is below the requirement:" + universityLanguage.getLevel());
            language.setIsSatisfactory(false);
        }
        else if ( languageLevel.charAt(0) > universityLanguage.getLevel().charAt(0) ) {
            application.setLanguageStatus("Language Requirement is met");
            language.setIsSatisfactory(true);
        }
        else {
            if ( universityLanguage.getLevel().charAt(1) > languageLevel.charAt(1) ) {
                application.setLanguageStatus("Your language level:" + languageLevel + " is below the requirement:" + universityLanguage.getLevel());
                language.setIsSatisfactory(false);
            }
            else if ( languageLevel.charAt(1) >= universityLanguage.getLevel().charAt(1) ) {
                application.setLanguageStatus("Language Requirement is met");
                language.setIsSatisfactory(true);
            }
        }

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new language detail has been added to your application!");

        notificationService.saveNotification(newNotification);

        languageRepository.save(language);
        return new ResponseEntity<>("Successfully added the language detail to the outgoing student!", HttpStatus.OK);
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
