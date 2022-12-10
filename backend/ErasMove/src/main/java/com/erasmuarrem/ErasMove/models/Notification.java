package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Notification {
    //Auto Generated ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private boolean isRead;
    private String content;
    //This one is to hold when the notification is send.
    //private LocalDate date;

    @OneToOne
    private ApplicationUser applicationUser;
}
