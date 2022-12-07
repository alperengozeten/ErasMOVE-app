package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.FileRequest;
import com.erasmuarrem.ErasMove.services.FileRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fileRequest")
public class FileRequestController {

    private final FileRequestService fileRequestService;

    @Autowired
    public FileRequestController(FileRequestService fileRequestService) {
        this.fileRequestService = fileRequestService;
    }

    @GetMapping
    public List<FileRequest> getFileRequests() {
        return fileRequestService.getFileRequests();
    }

    @GetMapping("/{id}")
    public FileRequest getFileRequestByID(@PathVariable("id") Long id) {
        return fileRequestService.getFileRequestByID(id);
    }

    @GetMapping("/outgoingStudent/{outgoingStudentID}")
    public List<FileRequest> getFileRequestsByOutgoingStudentID(@PathVariable("outgoingStudentID") Long outgoingStudentID) {
        return fileRequestService.getFileRequestsByOutgoingStudentID(outgoingStudentID);
    }

    @GetMapping("/administrativeStaff/{administrativeStaffID}")
    public List<FileRequest> getFileRequestsByAdministrativeStaffID(@PathVariable("administrativeStaffID") Long administrativeStaffID) {
        return fileRequestService.getFileRequestByAdministrativeStaffID(administrativeStaffID);
    }

    @GetMapping("/administrativeStaff/{administrativeStaffID}/outgoingStudent/{outgoingStudentID}")
    public List<FileRequest> getFileRequestsByAdministrativeStaffIDAndOutgoingStudentID(
            @PathVariable("administrativeStaffID") Long administrativeStaffID,
            @PathVariable("outgoingStudentID") Long outgoingStudentID
    ) {
        return fileRequestService.getFileRequestByAdministrativeStaffIDAndOutgoingStudentID(administrativeStaffID, outgoingStudentID);
    }

    @PostMapping("/add")
    public void addFileRequest(@RequestBody FileRequest fileRequest) {
        fileRequestService.addFileRequest(fileRequest);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFileRequestByID(@PathVariable("id") Long id) {
        fileRequestService.deleteFileRequestByID(id);
    }
}
