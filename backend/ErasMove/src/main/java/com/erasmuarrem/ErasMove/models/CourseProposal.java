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
public class CourseProposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private IncomingStudent incomingStudent;

    @OneToOne
    private AdministrativeStaff administrativeStaff;

    @ManyToMany
    private List<Course> plannedCourses;

    private String status;
}
