package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String title;
    private String description;
    private LocalDate announcedDate;

    @OneToOne
    private DepartmentCoordinator departmentCoordinator;
}
