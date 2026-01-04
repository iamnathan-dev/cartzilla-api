package com.source.cartzilla.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String first_name;

    private String last_name;

    private String email;

    private String password;

    private Short role;

    private boolean is_verified = false;

    private LocalDate email_verified_at;

    private LocalDate created_at = LocalDate.now();

    private LocalDate updated_at = LocalDate.now();
}
