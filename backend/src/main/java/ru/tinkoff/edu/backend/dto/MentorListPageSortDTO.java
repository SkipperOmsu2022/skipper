package ru.tinkoff.edu.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorListPageSortDTO {
    private List<MentorListItemDTO> content;
    private Long totalElement;
}
