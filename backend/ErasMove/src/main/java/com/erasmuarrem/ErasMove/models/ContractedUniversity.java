package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@MappedSuperclass
public abstract class ContractedUniversity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String universityName;
    private String country;

    @OneToMany
    private List<Course> approvedCourses;

    @OneToMany
    private List<Course> rejectedCourses;

}
