package ru.tinkoff.edu.backend.dto;

import lombok.Builder;
import lombok.Data;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import java.util.Set;

@Data
@Builder
public class MentorListItemDTO {
    private String firstName;
    private String lastName;
    private Set<MentorSpecialization> mentorSpecializations;
    private String aboutMeAsMentor;
}
