package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class MobilityCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @ManyToMany
    List<Course> mergedCourses;

    @ManyToOne
    Course correspondingCourse;

    @OneToOne
    PreApprovalFormRequest preApprovalFormRequest;

    String type; // Technical Elective, Additional,...
}
