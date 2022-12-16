package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.MobilityCourse;
import com.erasmuarrem.ErasMove.repositories.CourseRepository;
import com.erasmuarrem.ErasMove.repositories.MobilityCourseRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MobilityCourseService {

    private final MobilityCourseRepository mobilityCourseRepository;
    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public MobilityCourseService(MobilityCourseRepository mobilityCourseRepository, PreApprovalFormRequestRepository preApprovalFormRequestRepository, CourseRepository courseRepository) {
        this.mobilityCourseRepository = mobilityCourseRepository;
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
        this.courseRepository = courseRepository;
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

    public ResponseEntity<String> addMobilityCourse(MobilityCourse mobilityCourse) {
        Long preApprovalFormRequestID = mobilityCourse.getPreApprovalFormRequest().getID();

        if ( !preApprovalFormRequestRepository.existsById(preApprovalFormRequestID) ) {
            return new ResponseEntity<>("Pre-Approval Form Request with id:" + preApprovalFormRequestID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        Long correspondingCourseID = mobilityCourse.getCorrespondingCourse().getID();

        if ( !courseRepository.existsById(correspondingCourseID) ) {
            return new ResponseEntity<>("Corresponding Course with id:" + correspondingCourseID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        mobilityCourseRepository.save(mobilityCourse);
        return new ResponseEntity<>("Successfully saved the mobility course!", HttpStatus.OK);
    }

    public List<MobilityCourse> getMobilityCoursesByPreApprovalFormRequestID(Long preApprovalFormRequestID) {

        if ( !preApprovalFormRequestRepository.existsById(preApprovalFormRequestID) ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + preApprovalFormRequestID + " doesn't exist!");
        }

        return mobilityCourseRepository.findByPreApprovalFormRequestID(preApprovalFormRequestID);
    }

    public void deleteMobilityCourseByID(Long id) {
        Optional<MobilityCourse> mobilityCourseOptional = mobilityCourseRepository.findById(id);

        if ( !mobilityCourseOptional.isPresent() ) {
            throw new IllegalStateException("Mobility Course with id:" + id + " doesn't exist!");
        }

        mobilityCourseRepository.deleteById(id);
    }

    @Transactional
    public ResponseEntity<String> deleteMobilityCoursesByPreApprovalFormRequestID(Long preApprovalFormRequestID) {

        if ( !preApprovalFormRequestRepository.existsById(preApprovalFormRequestID) ) {
            return new ResponseEntity<>("Pre-Approval Form Request with id:" + preApprovalFormRequestID + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        mobilityCourseRepository.deleteAllByPreApprovalFormRequest_ID(preApprovalFormRequestID);
        return new ResponseEntity<>("Successfully deleted the Mobility Courses with the specific Pre-Approval Form ID!", HttpStatus.OK);
    }
}
