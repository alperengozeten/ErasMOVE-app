package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ContractedUniversity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;

    private String universityName;
    private String country;

    @OneToMany
    private List<Course> rejectedCourses;

    @OneToMany
    private List<OutgoingStudent> acceptedStudents;

    @OneToOne
    private Language languageRequirement;
}
