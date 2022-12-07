package ru.tinkoff.edu.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MentorListItemDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String mentorSpecializations;
    private String aboutMeAsMentor;
    private String imageUserResource;
}
