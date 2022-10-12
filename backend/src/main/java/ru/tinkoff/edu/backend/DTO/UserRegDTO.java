package ru.tinkoff.edu.backend.DTO;

import lombok.Data;

@Data
public class UserRegDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
