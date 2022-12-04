package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@MappedSuperclass
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private String name;
    private String email;
    private String hashedPassword;

    //@OneToMany
    //private List<CourseApprovalRequest> courseApprovalRequestList;

    // put notification, chat, ...
    // Maybe put a token here later on
}
