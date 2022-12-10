package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table
@Getter
@Setter
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;
    private String name;
    private String email;
    private String hashedPassword;

    @OneToOne
    private Token userToken;

    //@OneToMany
    //private List<CourseApprovalRequest> courseApprovalRequestList;

    // put notification, chat, ...
    // Maybe put a token here later on
}
