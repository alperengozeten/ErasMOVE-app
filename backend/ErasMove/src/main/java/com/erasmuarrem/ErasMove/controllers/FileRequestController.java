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

    @PostMapping("/add")
    public void addFileRequest(@RequestBody FileRequest fileRequest) {
        fileRequestService.addFileRequest(fileRequest);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFileRequestByID(@PathVariable("id") Long id) {
        fileRequestService.deleteFileRequestByID(id);
    }
}
