package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.enums.SortField;

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

  @Builder.Default private SortField sortField = SortField.DEFAULT;

  @Builder.Default
  private MentorSpecialization[] mentorSpecializations = MentorSpecialization.values();

  @Builder.Default private String query = "";
  @Builder.Default private Boolean onlyWithPhoto = false;
  private Long userId;
}
