package ru.tinkoff.edu.backend.dto;

import lombok.Data;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import java.time.LocalDate;
import java.util.Set;

@Data
public class UserProfileDTO {
    private String firstName;
    private String lastName;
    private String patronymic;
    private String aboutMe;
    private Boolean isEnabledMentorStatus;
    private LocalDate dateOfRegistration;
    private String imageUserResource;
    private Set<MentorSpecialization> mentorSpecializations;
    private String linkVk;
    private String linkSkype;
    private String linkDiscord;
    private String linkTelegram;
}
