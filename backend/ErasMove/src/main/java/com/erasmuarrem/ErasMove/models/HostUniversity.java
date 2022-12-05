package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class HostUniversity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String universityName;

    @OneToMany
    private List<Department> departmentList;

    @OneToMany
    private List<OutgoingStudent> waitingQueue;

    // no need to hold contracted universities or announcements
}
