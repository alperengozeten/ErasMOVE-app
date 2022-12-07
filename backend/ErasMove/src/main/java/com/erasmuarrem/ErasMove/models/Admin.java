package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table

public class Admin {
    @Id
    @GeneratedValue( strategy = GenerationType.SEQUENCE)
    private Long ID;
    private String hashedPassword;
    private String email;
    @OneToOne
    private Token token;


}
