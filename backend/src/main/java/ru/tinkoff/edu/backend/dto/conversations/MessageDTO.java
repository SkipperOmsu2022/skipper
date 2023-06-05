package ru.tinkoff.edu.backend.dto.conversations;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {
  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private Long id;

  @NotBlank private String messageContent;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private LocalDateTime dateTimeSend;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private Long userFrom;
}
