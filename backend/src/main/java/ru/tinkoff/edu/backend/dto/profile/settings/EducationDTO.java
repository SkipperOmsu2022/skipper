package ru.tinkoff.edu.backend.dto.profile.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationDTO {
    @PastOrPresent(message = "The beginning of the education cannot be in the future time")
    private LocalDate dateStart;
    private LocalDate dateEnd;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long qualificationId;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String qualificationNameWithCode;
    @NotBlank
    private String educationalInstitution;
}
