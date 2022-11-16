package ru.tinkoff.edu.backend.dto;

import lombok.Data;
import ru.tinkoff.edu.backend.enums.UserGender;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class UserMainInfoDTO {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotNull
    private String patronymic;
    @Past
    private LocalDate dateOfBirth;
    private UserGender gender;
    @Size(max = 400)
    private String aboutMe;
}
