package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
public class OutgoingStudent extends Student {
    private double cgpa;
    private Boolean isDoubleMajor;
    // private List<String> languages;
    // private Application application;
}
