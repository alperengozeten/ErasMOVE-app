package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * this controller class manages the operations related to the document
 */
@RestController
@RequestMapping("/document")
@CrossOrigin
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    /**
     * this method fetches a file with a given requestID
     * @param folder String
     * @param requestID Long
     * @return file containg the information
     */
    @GetMapping("/{folder}/{requestID}")
    public ResponseEntity<Resource> getDocumentByFolderNameAndRequestID(@PathVariable("folder") String folder,
                                                                        @PathVariable("requestID") Long requestID) {
        return documentService.getDocumentByFolderNameAndRequestID(folder, requestID);
    }

    /**
     * this method uploads syllabus for the Elective Course Approval Request
     * @param id Long
     * @param syllabus MultipartFile
     * @return String
     */
    @PostMapping("/electiveCourseApproval/syllabus/{requestID}")
    public String uploadElectiveSyllabusByRequestID(@PathVariable("requestID") Long id, @RequestParam("syllabus") MultipartFile syllabus) {
        return documentService.saveDocument(syllabus, "electiveCourseApproval", "syllabus", id);
    }

    /**
     * this method uploads syllabus for the Mandatory Course Approval Request
     * @param id Long
     * @param syllabus MultipartFile
     * @return String
     */
    @PostMapping("/mandatoryCourseApproval/syllabus/{requestID}")
    public String uploadMandatorySyllabusByRequestID(@PathVariable("requestID") Long id, @RequestParam("syllabus") MultipartFile syllabus) {
        return documentService.saveDocument(syllabus, "mandatoryCourseApproval", "syllabus", id);
    }

    /**
     * this method uploads
     * @param id Long
     * @param type String
     * @param file MultipartFile
     * @return String
     */
    @PostMapping("/fileRequest/{type}/{requestID}")
    public String uploadFileRequestByRequestID(@PathVariable("requestID") Long id, @PathVariable("type") String type, @RequestParam("file") MultipartFile file) {
        return documentService.saveDocument(file, "fileRequest", type, id);
    }
}
