package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OutgoingStudentService {

    private final OutgoingStudentRepository outgoingStudentRepository;
    @Autowired
    public OutgoingStudentService(OutgoingStudentRepository outgoingStudentRepository) {
        this.outgoingStudentRepository = outgoingStudentRepository;
    }

    public String helloService() {
        return "Hello";
    }

    public List<OutgoingStudent> getStudents() {
        return outgoingStudentRepository.findAll();
    }

    public void addOutgoingStudent(OutgoingStudent outgoingStudent) {
        Optional<OutgoingStudent> outgoingStudentOptional = outgoingStudentRepository.findByEmail(outgoingStudent.getEmail());

        if ( outgoingStudentOptional.isPresent() ) {
            throw new IllegalStateException("student exists!");
        }

        outgoingStudentRepository.save(outgoingStudent);
    }

    public Optional<OutgoingStudent> getStudentByID(Long id) {
        return outgoingStudentRepository.findById(id);
    }
}
