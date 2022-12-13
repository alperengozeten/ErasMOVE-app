package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@MappedSuperclass
public abstract class Student extends ApplicationUser {

    private int semester;
    private Long studentId;
    @OneToOne
    private Department department;
}
