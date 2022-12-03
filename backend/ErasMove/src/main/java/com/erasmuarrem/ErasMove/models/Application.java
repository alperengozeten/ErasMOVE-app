package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private String selectedSemester;

    // add some other attributes
    // acceptedUniversity
    // selectedUniversities
}
