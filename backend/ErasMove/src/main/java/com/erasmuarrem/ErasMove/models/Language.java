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
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String language;
    private Boolean isSatisfactory;
    private String level;

    @OneToOne
    private OutgoingStudent outgoingStudent;
}
