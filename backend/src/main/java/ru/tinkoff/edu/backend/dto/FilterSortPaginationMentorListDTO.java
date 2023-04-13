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
    private Integer offset = 0;
    @Min(1)
    @Max(100)
    private Integer limit = 30;
    private String sortFiled = "id";
    private MentorSpecialization[] mentorSpecializations = MentorSpecialization.values();
    private String query = "";
    private Boolean onlyWithPhoto = false;
}
