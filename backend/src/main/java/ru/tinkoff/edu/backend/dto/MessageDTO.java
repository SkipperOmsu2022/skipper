package ru.tinkoff.edu.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    @NotBlank
    private String text;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime dateTimeSend;
}
