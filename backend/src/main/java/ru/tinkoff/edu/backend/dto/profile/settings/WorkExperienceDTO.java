package ru.tinkoff.edu.backend.dto.profile.settings;

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
public class WorkExperienceDTO {
    @PastOrPresent(message = "The beginning of the work experience cannot be in the future time")
    private LocalDate dateStart;
    private LocalDate dateEnd;
    @NotBlank
    private String placeOfWork;
}
