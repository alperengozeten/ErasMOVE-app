package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class OutgoingStudent extends Student {
    private double cgpa;
    private Boolean isDoubleMajor;
    private Boolean isErasmus;
    // private Application application;
}
