package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
public class ErasmusUniversityDepartment extends Department {

    // maybe put here id as well???
    private int quota;
    private int maxQuota;

    @OneToOne
    private ErasmusUniversity erasmusUniversity;
}
