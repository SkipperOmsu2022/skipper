package ru.tinkoff.edu.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.entities.Messages;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserConversationDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String imageUserResource;
    private String mentorSpecializations;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Messages> messages;
}
