package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private Long mentorId;
    private Long userAuthorId;
    @Min(value = 1,message = "Минимальное число рейтинга = 1")
    @Max(value = 5, message = "Максимальное число рейтинга = 5")
    private int rating;
    @Length(min = 10, max = 400, message = "Минимальная длина отзыва = 10, Максимальная отзыва длина = 400")
    private String text;
}
