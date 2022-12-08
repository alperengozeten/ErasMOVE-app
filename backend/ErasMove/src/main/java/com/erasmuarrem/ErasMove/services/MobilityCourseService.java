package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.MobilityCourse;
import com.erasmuarrem.ErasMove.repositories.MobilityCourseRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MobilityCourseService {

    private final MobilityCourseRepository mobilityCourseRepository;
    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;

    @Autowired
    public MobilityCourseService(MobilityCourseRepository mobilityCourseRepository, PreApprovalFormRequestRepository preApprovalFormRequestRepository) {
        this.mobilityCourseRepository = mobilityCourseRepository;
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
    }

    public List<MobilityCourse> getMobilityCourses() {
        return mobilityCourseRepository.findAll();
    }

    public MobilityCourse getMobilityCourseByID(Long id) {
        Optional<MobilityCourse> mobilityCourseOptional = mobilityCourseRepository.findById(id);

        if ( !mobilityCourseOptional.isPresent() ) {
            throw new IllegalStateException("Mobility course with id:" + id + " doesn't exist!");
        }

        return mobilityCourseOptional.get();
    }

    public void addMobilityCourse(MobilityCourse mobilityCourse) {
        Long preApprovalFormRequestID = mobilityCourse.getPreApprovalFormRequest().getID();

        if ( !preApprovalFormRequestRepository.existsById(preApprovalFormRequestID) ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + preApprovalFormRequestID + " doesn't exist!");
        }

        Optional<MobilityCourse> mobilityCourseOptional = mobilityCourseRepository.findByPreApprovalFormRequestID(preApprovalFormRequestID);

        if ( mobilityCourseOptional.isPresent() ) {
            throw new IllegalStateException("Mobility Course already exists for Pre-Approval Form Request with id:" + preApprovalFormRequestID + "!");
        }

        mobilityCourseRepository.save(mobilityCourse);
    }

    public MobilityCourse getMobilityCourseByPreApprovalFormRequestID(Long preApprovalFormRequestID) {

        if ( !preApprovalFormRequestRepository.existsById(preApprovalFormRequestID) ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + preApprovalFormRequestID + " doesn't exist!");
        }

        Optional<MobilityCourse> mobilityCourseOptional = mobilityCourseRepository.findByPreApprovalFormRequestID(preApprovalFormRequestID);

        if ( !mobilityCourseOptional.isPresent() ) {
            throw new IllegalStateException("Mobility Course doesn't exist for Pre-Approval Form Request with id:" + preApprovalFormRequestID + "!");
        }

        return mobilityCourseOptional.get();
    }

    public void deleteMobilityCourseByID(Long id) {
        Optional<MobilityCourse> mobilityCourseOptional = mobilityCourseRepository.findById(id);

        if ( !mobilityCourseOptional.isPresent() ) {
            throw new IllegalStateException("Mobility Course with id:" + id + " doesn't exist!");
        }

        mobilityCourseRepository.deleteById(id);
    }

    public void deleteMobilityCourseByPreApprovalFormRequestID(Long preApprovalFormRequestID) {

        if ( !preApprovalFormRequestRepository.existsById(preApprovalFormRequestID) ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + preApprovalFormRequestID + " doesn't exist!");
        }

        Optional<MobilityCourse> mobilityCourseOptional = mobilityCourseRepository.findByPreApprovalFormRequestID(preApprovalFormRequestID);

        if ( !mobilityCourseOptional.isPresent() ) {
            throw new IllegalStateException("Mobility Course doesn't exist for Pre-Approval Form Request with id:" + preApprovalFormRequestID + "!");
        }

        mobilityCourseRepository.deleteById(mobilityCourseOptional.get().getID());
    }
}
