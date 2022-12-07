package ru.tinkoff.edu.backend.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserEditAccountDTO {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String oldPassword;
    @NotBlank
    private String newPassword;
    @NotBlank
    private String repeatNewPassword;
}
