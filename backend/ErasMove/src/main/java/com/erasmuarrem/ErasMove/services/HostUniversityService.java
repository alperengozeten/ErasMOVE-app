package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.HostUniversity;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.repositories.HostUniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HostUniversityService {

    private final HostUniversityRepository hostUniversityRepository;
    private final OutgoingStudentService outgoingStudentService;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ExchangeUniversityService exchangeUniversityService;

    @Autowired
    public HostUniversityService(HostUniversityRepository hostUniversityRepository, OutgoingStudentService outgoingStudentService, ErasmusUniversityService erasmusUniversityService, ExchangeUniversityService exchangeUniversityService) {
        this.hostUniversityRepository = hostUniversityRepository;
        this.outgoingStudentService = outgoingStudentService;
        this.erasmusUniversityService = erasmusUniversityService;
        this.exchangeUniversityService = exchangeUniversityService;
    }

    public HostUniversity getHostUniversityById( Long id) {
        Optional<HostUniversity> hostUniversityOptional = hostUniversityRepository.findById(id);
        if (!hostUniversityOptional.isPresent() ) {
            throw new IllegalStateException("HostUniversity with id" + id+ " doesn't exist!");
        }
        return hostUniversityOptional.get();
    }

    public void addHostUniversity( HostUniversity hostUniversity ) {
        Optional<HostUniversity> hostUniversityOptional = hostUniversityRepository.findByUniversityName(hostUniversity.getUniversityName());
        if ( hostUniversityOptional.isPresent() ) {
            throw new IllegalStateException("HostUniversity with name" + hostUniversity.getUniversityName() + " already exist!");
        }
        hostUniversityRepository.save(hostUniversity);
    }

    public void addStudentToWaitingBinById( Long id ) {
        HostUniversity hostUniversity = hostUniversityRepository.findAll().get(0);
        Optional<OutgoingStudent> outgoingStudent = outgoingStudentService.getStudentByID( id );
        if (!outgoingStudent.isPresent()) { throw new IllegalStateException("Student with id " + id+ " doesn't exist!"); }

        List<OutgoingStudent> outList = hostUniversity.getWaitingQueue();
        outList.add(outgoingStudent.get());
        hostUniversity.setWaitingQueue(outList);

        hostUniversityRepository.save(hostUniversity);
    }

    public void removeStudentFromWaitingBinById( Long id ) {
        HostUniversity hostUniversity = hostUniversityRepository.findAll().get(0);

        if ( !(hostUniversity.getWaitingQueue().contains( outgoingStudentService.getStudentByID(id).get() ) ) ) {
            throw new IllegalStateException("Student with id " + id + " doesn't exist in waiting queue of host university.");
        }

        List<OutgoingStudent> newList = hostUniversity.getWaitingQueue();
        newList.remove(outgoingStudentService.getStudentByID(id).get());
        hostUniversity.setWaitingQueue(newList);

        hostUniversityRepository.save(hostUniversity);
    }

    public List<OutgoingStudent> getAllAcceptedOutgoingStudents() {
        List<OutgoingStudent> allAcceptedStudents = new ArrayList<>();

        allAcceptedStudents.addAll(erasmusUniversityService.getAllAcceptedOutgoingStudents());
        allAcceptedStudents.addAll(exchangeUniversityService.getAllAcceptedOutgoingStudents());

        return allAcceptedStudents;
    }

    public List<OutgoingStudent> getAllAcceptedOutgoingStudentsByDepartmentID(Long departmentID) {
        List<OutgoingStudent> allAcceptedStudents = new ArrayList<>();

        allAcceptedStudents.addAll(erasmusUniversityService.getAllAcceptedOutgoingStudentsByDepartmentID(departmentID));
        allAcceptedStudents.addAll(exchangeUniversityService.getAllAcceptedOutgoingStudentsByDepartmentID(departmentID));

        return allAcceptedStudents;
    }
}
