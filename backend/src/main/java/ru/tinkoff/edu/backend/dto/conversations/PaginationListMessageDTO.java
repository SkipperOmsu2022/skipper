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
public class PaginationListMessageDTO {
  @Min(0)
  @Builder.Default
  private Integer offset = 0;

  @Min(10)
  @Max(50)
  @Builder.Default
  private Integer limit = 30;
}
