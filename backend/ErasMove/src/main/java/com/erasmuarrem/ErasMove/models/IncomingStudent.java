package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class IncomingStudent extends Student {
    private String semester;
    private String courseProposalStatus;

    @OneToOne
    private ContractedUniversity contractedUniversity;

    @ManyToMany
    private List<Course> preferredCourses;
}
