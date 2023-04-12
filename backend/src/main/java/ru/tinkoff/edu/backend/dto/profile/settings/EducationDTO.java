package ru.tinkoff.edu.backend.dto.profile.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class EducationDTO {
    @NotNull(message = "Начало получения образования обязательно!")
    private Integer yearStart;
    private Integer yearEnd;
    @NotNull
    private Long qualificationId;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String qualificationNameWithCode;
    @NotBlank
    private String educationalInstitution;
}
