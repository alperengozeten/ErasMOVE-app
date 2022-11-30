package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@MappedSuperclass
public abstract class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String info;

    private Boolean isResponded;

    @OneToOne
    private OutgoingStudent student;

}
