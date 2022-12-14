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
public class Application {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long ID;

    @OneToOne
    private OutgoingStudent outgoingStudent;
    private double applicationScore;

    private String selectedSemester;

    @ManyToMany
    private List<ContractedUniversity> selectedUniversities;


    // add some other attributes

    // selectedUniversities
}
