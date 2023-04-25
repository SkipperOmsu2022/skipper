package ru.tinkoff.edu.backend.dto.profile.settings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperienceDTO {
    @NotNull(message = "Начало опыта работы обязательно!")
    private Integer yearStart;
    private Integer yearEnd;
    @NotBlank
    private String placeOfWork;
}
