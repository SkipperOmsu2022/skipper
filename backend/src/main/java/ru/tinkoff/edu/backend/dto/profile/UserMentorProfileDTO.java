package ru.tinkoff.edu.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserMentorProfileDTO {
    private String firstName;
    private String lastName;
    private String patronymic;
    private String aboutAsMentor;
    private Boolean isEnabledMentorStatus;
    private String imageUserResource;
    private LocalDate dateOfRegistration;
    private String mentorSpecializations;
    private String linkVk;
    private String linkSkype;
    private String linkDiscord;
    private String linkTelegram;
}
