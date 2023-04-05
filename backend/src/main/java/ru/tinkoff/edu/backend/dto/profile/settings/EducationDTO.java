package ru.tinkoff.edu.backend.dto.profile.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationDTO {
    private Integer yearStart;
    private Integer yearEnd;
    private Long qualificationId;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String qualificationNameWithCode;
    @NotBlank
    private String educationalInstitution;
}
