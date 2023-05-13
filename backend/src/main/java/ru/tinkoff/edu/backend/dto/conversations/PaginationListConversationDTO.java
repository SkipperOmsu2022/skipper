package ru.tinkoff.edu.backend.dto.conversations;

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
public class PaginationListConversationDTO {
    @Min(0)
    @Builder.Default
    private Integer offsetConversations = 0;
    @Min(1)
    @Max(20)
    @Builder.Default
    private Integer limitConversations = 10;
    @Min(5)
    @Max(50)
    @Builder.Default
    private Integer limitMessages = 20;
}
