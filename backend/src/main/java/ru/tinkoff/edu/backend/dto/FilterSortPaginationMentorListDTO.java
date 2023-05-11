package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FilterSortPaginationMentorListDTO {
    @Min(0)
    @Builder.Default
    private Integer offset = 0;
    @Min(1)
    @Max(100)
    @Builder.Default
    private Integer limit = 30;
    @Builder.Default
    private String sortField = "id";
    @Builder.Default
    private MentorSpecialization[] mentorSpecializations = MentorSpecialization.values();
    @Builder.Default
    private String query = "";
    @Builder.Default
    private Boolean onlyWithPhoto = false;
    private Long userId;
    @Min(value = 1,message = "Минимальное число рейтинга = 1")
    @Max(value = 5, message = "Максимальное число рейтинга = 5")
    private Integer rating;
}
