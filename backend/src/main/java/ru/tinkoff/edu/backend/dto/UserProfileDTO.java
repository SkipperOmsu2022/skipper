package ru.tinkoff.edu.backend.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserProfileDTO {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotNull
    private String patronymic;
    @Size(max = 400)
    private String aboutMe;
    private String linkVk;
    private String linkSkype;
    private String linkDiscord;
    private String linkTelegram;
}
