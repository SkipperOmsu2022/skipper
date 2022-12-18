package ru.tinkoff.edu.backend.dto;

import lombok.Builder;
import lombok.Data;
import ru.tinkoff.edu.backend.entities.Messages;

import java.util.List;

@Data
@Builder
public class UserConversationDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String imageUserResource;
    private String mentorSpecializations;
    private List<Messages> messages;
}
