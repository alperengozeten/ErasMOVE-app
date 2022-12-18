package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.Document;
import com.erasmuarrem.ErasMove.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@CrossOrigin
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public String saveDocument(MultipartFile multipartFile, String folder, String type, Long requestID) {

        String path = new FileSystemResource("").getFile().getAbsolutePath();
        Path root = Path.of(path);
        root = root.resolve("documents").resolve(folder).resolve(requestID + ".pdf");

        Document newDocument = new Document();
        newDocument.setFolder(folder);
        newDocument.setType(type);
        newDocument.setRequestID(requestID);

        try {
            Files.copy(multipartFile.getInputStream(), root);
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                return "A file of that name already exists.";
            }

            return e.getMessage();
        }

        documentRepository.save(newDocument);
        return "File saved successfully!";
    }

    public ResponseEntity<Resource> getDocumentByFolderNameAndRequestID(String folder, Long requestID) {
        String path = new FileSystemResource("").getFile().getAbsolutePath();
        Path root = Path.of(path);
        root = root.resolve("documents").resolve(folder).resolve(requestID + ".pdf");

        Resource resource;
        try {
            resource = new UrlResource(root.toUri());
            return new ResponseEntity<>(resource, HttpStatus.OK);
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Could not read the file!");
        }
    }
}
