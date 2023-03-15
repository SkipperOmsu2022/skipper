package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorListItemDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String mentorSpecializations;
    private String aboutMeAsMentor;
    private String imageUserResource;
    private Double rating;
}
