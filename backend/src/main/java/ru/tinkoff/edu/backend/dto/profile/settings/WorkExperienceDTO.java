package ru.tinkoff.edu.backend.dto.profile.settings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.validation.FirstFieldLargeSecondField;
import ru.tinkoff.edu.backend.validation.PastOrPresentYear;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FirstFieldLargeSecondField(
        firstField = "yearEnd", secondField = "yearStart", message = "The start year cannot be less!"
)
public class WorkExperienceDTO {
    @NotNull(message = "Начало опыта работы обязательно!")
    @PastOrPresentYear
    private Integer yearStart;
    private Integer yearEnd;
    @NotBlank
    private String placeOfWork;
}
