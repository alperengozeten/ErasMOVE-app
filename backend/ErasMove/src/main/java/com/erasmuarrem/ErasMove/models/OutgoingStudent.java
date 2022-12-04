package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
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
public class OutgoingStudent extends Student {
    private double cgpa;
    private Boolean isDoubleMajor;

    @ElementCollection
    private List<String> proficientLanguages;
    // private Application application;
}
