package ru.tinkoff.edu.backend.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserLoginDTO {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
}
