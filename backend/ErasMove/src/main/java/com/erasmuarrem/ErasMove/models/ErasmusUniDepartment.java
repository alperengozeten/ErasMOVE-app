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
public class ErasmusUniDepartment extends Department {

    // maybe put here id as well???
    private int quota;

    @OneToOne
    private ErasmusUniversity erasmusUniversity;
}
