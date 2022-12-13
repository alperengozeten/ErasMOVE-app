package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/document")
@CrossOrigin
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/{folder}/{requestID}")
    public ResponseEntity<Resource> getDocumentByFolderNameAndRequestID(@PathVariable("folder") String folder,
                                                                        @PathVariable("requestID") Long requestID) {
        return documentService.getDocumentByFolderNameAndRequestID(folder, requestID);
    }

    @PostMapping("/electiveCourseApproval/syllabus/{requestID}")
    public String uploadElectiveSyllabusByRequestID(@PathVariable("requestID") Long id, @RequestParam("syllabus") MultipartFile syllabus) {
        return documentService.saveDocument(syllabus, "electiveCourseApproval", "syllabus", id);
    }

    @PostMapping("/mandatoryCourseApproval/syllabus/{requestID}")
    public String uploadMandatorySyllabusByRequestID(@PathVariable("requestID") Long id, @RequestParam("syllabus") MultipartFile syllabus) {
        return documentService.saveDocument(syllabus, "mandatoryCourseApproval", "syllabus", id);
    }

    @PostMapping("/fileRequest/{type}/{requestID}")
    public String uploadMandatorySyllabusByRequestID(@PathVariable("requestID") Long id, @PathVariable("type") String type, @RequestParam("file") MultipartFile file) {
        return documentService.saveDocument(file, "fileRequest", type, id);
    }
}
