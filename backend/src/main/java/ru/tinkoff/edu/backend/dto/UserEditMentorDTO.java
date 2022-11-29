package ru.tinkoff.edu.backend.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserEditMentorDTO {
    @NotNull
    private Boolean isEnabledMentorStatus;
    @NotBlank
    @Size(max = 400)
    private String aboutMeAsMentor;
    @NotBlank
    private String specialization;
}
