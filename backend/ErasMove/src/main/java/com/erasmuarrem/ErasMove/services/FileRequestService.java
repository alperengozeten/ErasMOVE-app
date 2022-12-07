package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.FileRequest;
import com.erasmuarrem.ErasMove.repositories.AdministrativeStaffRepository;
import com.erasmuarrem.ErasMove.repositories.FileRequestRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FileRequestService {

    private final FileRequestRepository fileRequestRepository;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final AdministrativeStaffRepository administrativeStaffRepository;

    @Autowired
    public FileRequestService(FileRequestRepository fileRequestRepository, OutgoingStudentRepository outgoingStudentRepository, AdministrativeStaffRepository administrativeStaffRepository) {
        this.fileRequestRepository = fileRequestRepository;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.administrativeStaffRepository = administrativeStaffRepository;
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

    public void addFileRequest(FileRequest fileRequest) {
        Long administrativeStaffID = fileRequest.getAdministrativeStaff().getID();
        Long outgoingStudentID = fileRequest.getStudent().getID();

        if ( !administrativeStaffRepository.existsById(administrativeStaffID) ) {
            throw new IllegalStateException("Administrative Staff with id:" + administrativeStaffID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        fileRequestRepository.save(fileRequest);
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
}
