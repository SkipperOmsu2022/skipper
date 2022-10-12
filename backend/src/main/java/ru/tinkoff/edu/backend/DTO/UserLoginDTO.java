package ru.tinkoff.edu.backend.DTO;

import lombok.Data;

@Data
public class UserLoginDTO {
    private String email;
    private String password;
}
