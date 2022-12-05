package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.HostUniversity;
import com.erasmuarrem.ErasMove.models.OutgoingStudent;
import com.erasmuarrem.ErasMove.repositories.HostUniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HostUniversityService {

    private final HostUniversityRepository hostUniversityRepository;
    @Autowired
    private final OutgoingStudentService outgoingStudentService;

    @Autowired
    public HostUniversityService( HostUniversityRepository hostUniversityRepository, OutgoingStudentService outgoingStudentService) {
        this.hostUniversityRepository = hostUniversityRepository;
        this.outgoingStudentService = outgoingStudentService;
    }

    public HostUniversity getHostUniversityById( Long id) {
        Optional<HostUniversity> hostUniversityOptional = hostUniversityRepository.findById(id);
        if (!hostUniversityOptional.isPresent() ) {
            throw new IllegalStateException("HostUniversity with id" + id+ " doesn't exist!");
        }
        return hostUniversityRepository.findById(id).get();
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
}
