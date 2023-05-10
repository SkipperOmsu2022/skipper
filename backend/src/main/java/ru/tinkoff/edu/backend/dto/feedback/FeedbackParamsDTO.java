package ru.tinkoff.edu.backend.dto.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackParamsDTO {
    private Long userId;
    @Min(0)
    @Builder.Default
    private Integer offset = 0;
    @Min(1)
    @Max(20)
    @Builder.Default
    private Integer limit = 10;
}
