package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class CourseApprovalRequest extends Request {

    private String courseName;
    private String description;
    private double ects;
    private String feedback;

    @ManyToOne
    private Course correspondingCourse;
}
