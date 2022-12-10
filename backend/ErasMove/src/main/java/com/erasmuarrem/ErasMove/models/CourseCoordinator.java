package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
public class CourseCoordinator extends ApplicationUser {

    @OneToMany
    private List<Course> courseList;
}
