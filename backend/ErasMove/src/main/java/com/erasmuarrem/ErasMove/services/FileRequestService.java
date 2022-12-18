package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import com.erasmuarrem.ErasMove.repositories.FileRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FileRequestService {

    private final FileRequestRepository fileRequestRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final AdministrativeStaffRepository administrativeStaffRepository;
    private final AdministrativeStaffService administrativeStaffService;
    private final NotificationService notificationService;
    private final DocumentService documentService;

    @Autowired
    public FileRequestService(FileRequestRepository fileRequestRepository, OutgoingStudentRepository outgoingStudentRepository, AdministrativeStaffRepository administrativeStaffRepository, AdministrativeStaffService administrativeStaffService, NotificationService notificationService, DocumentService documentService) {
        this.fileRequestRepository = fileRequestRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.administrativeStaffRepository = administrativeStaffRepository;
        this.administrativeStaffService = administrativeStaffService;
        this.notificationService = notificationService;
        this.documentService = documentService;
    }

    public List<FileRequest> getFileRequests() {
        return fileRequestRepository.findAll();
    }

    public FileRequest getFileRequestByID(Long id) {
        Optional<FileRequest> fileRequestOptional = fileRequestRepository.findById(id);

        if ( !fileRequestOptional.isPresent() ) {
            throw new IllegalStateException("File Request with id:" + id + " doesn't exist!");
        }

        return fileRequestOptional.get();
    }

    public ResponseEntity<ResponseMessage> addFileRequest(FileRequest fileRequest) {
        Long outgoingStudentID = fileRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        AdministrativeStaff administrativeStaff = administrativeStaffService.getAdministrativeStaffByDepartmentId(outgoingStudent.getDepartment().getID());

        if ( administrativeStaff == null ) {
            return new ResponseEntity<>(new ResponseMessage("There is no Administrative Staff for Department:" + outgoingStudent.getDepartment().getDepartmentName() + " to respond!", (long) -1),
                    HttpStatus.BAD_REQUEST);
        }

        // send notification to the administrative staff
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(administrativeStaff);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("You have a new file request by Outgoing Student: " +
                outgoingStudent.getName() + "!");

        notificationService.saveNotification(newNotification); // save the notification

        fileRequest.setStatus("WAITING");
        fileRequest.setAdministrativeStaff(administrativeStaff);
        fileRequestRepository.save(fileRequest);
        return new ResponseEntity<>(new ResponseMessage("File Request has been sent!", fileRequest.getID()), HttpStatus.OK);
    }

    public void deleteFileRequestByID(Long id) {
        if ( !fileRequestRepository.existsById(id) ) {
            throw new IllegalStateException("File Request with id:" + id + " doesn't exist!");
        }

        fileRequestRepository.deleteById(id);
    }

    public List<FileRequest> getFileRequestByAdministrativeStaffID(Long administrativeStaffID) {

        if ( !administrativeStaffRepository.existsById(administrativeStaffID) ) {
            throw new IllegalStateException("Administrative Staff with id:" + " doesn't exist!");
        }

        return fileRequestRepository.findByAdministrativeStaffID(administrativeStaffID);
    }

    public List<FileRequest> getFileRequestsByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return fileRequestRepository.findByStudentID(outgoingStudentID);
    }

    public List<FileRequest> getFileRequestByAdministrativeStaffIDAndOutgoingStudentID(Long administrativeStaffID, Long outgoingStudentID) {

        if ( !administrativeStaffRepository.existsById(administrativeStaffID) ) {
            throw new IllegalStateException("Administrative Staff with id:" + administrativeStaffID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return fileRequestRepository.findByAdministrativeStaffIDAndStudentID(administrativeStaffID, outgoingStudentID);
    }

    public ResponseEntity<String> respondToFileRequestByFileRequestID(Long id, String type, MultipartFile file) {
        Optional<FileRequest> fileRequestOptional = fileRequestRepository.findById(id);

        if ( !fileRequestOptional.isPresent() ) {
            return new ResponseEntity<>("File Request with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        FileRequest fileRequest = fileRequestOptional.get();

        if ( fileRequest.getStatus().equals("RESPONDED") ) {
            return new ResponseEntity<>("File Request with id:" + id + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = fileRequest.getStudent();
        AdministrativeStaff administrativeStaff = fileRequest.getAdministrativeStaff();

        // save the document
        documentService.saveDocument(file, "fileRequest", type, id);

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("You have a new file uploaded by the Administrative Staff: " +
                administrativeStaff.getName() + "!");

        notificationService.saveNotification(newNotification);

        fileRequest.setStatus("RESPONDED");
        fileRequestRepository.save(fileRequest);

        return new ResponseEntity<>("Successfully responded to the File Request!", HttpStatus.OK);
    }
}
