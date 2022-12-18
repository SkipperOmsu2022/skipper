package ru.tinkoff.edu.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@Builder
public class MessageDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    @NotBlank
    private String messageContent;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime dateTimeSend;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long userFrom;
}
