package ru.tinkoff.edu.backend.dto.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackListPageDTO {
    private List<FeedbackDTO> content;
    private Long totalElement;
}
