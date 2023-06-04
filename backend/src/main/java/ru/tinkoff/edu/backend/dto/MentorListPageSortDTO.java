package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Accessors(chain = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorListPageSortDTO {
  private List<MentorListItemDTO> content;
  private Long totalElement;
}
