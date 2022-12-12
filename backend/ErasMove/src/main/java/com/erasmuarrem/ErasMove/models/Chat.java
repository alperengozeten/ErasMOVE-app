package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    private ApplicationUser user1;
    @ManyToOne
    private ApplicationUser user2;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Message> user1Msgs = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL)
    private  List<Message> user2Msgs = new ArrayList<>();


}
