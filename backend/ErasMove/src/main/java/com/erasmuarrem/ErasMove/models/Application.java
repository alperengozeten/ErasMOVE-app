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
public class Application implements Comparable<Application> {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long ID;

    @OneToOne
    private OutgoingStudent outgoingStudent;
    private double applicationScore;
    private String selectedSemester;
    private String admittedStatus;
    private String preApprovalFormStatus;
    private String languageStatus;

    @ManyToMany
    private List<ContractedUniversity> selectedUniversities;

    @Override
    public int compareTo(Application o) {
       return Double.compare(this.applicationScore, o.applicationScore );
    }



    // add some other attributes

    // selectedUniversities
}
