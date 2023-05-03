package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoritesPaginationMentorListDTO {
    @Positive
    private Long userId;
    @Min(0)
    @Builder.Default
    private Integer offset = 0;
    @Min(1)
    @Max(100)
    @Builder.Default
    private Integer limit = 30;
}
