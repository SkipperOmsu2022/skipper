package ru.tinkoff.edu.backend.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.dto.profile.settings.EducationDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.WorkExperienceDTO;
import ru.tinkoff.edu.backend.entities.Education;
import ru.tinkoff.edu.backend.entities.WorkExperience;

import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.Set;

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
    private Set<EducationDTO> educations;
    private Set<WorkExperienceDTO> workExperiences;
    private String linkVk;
    private String linkSkype;
    private String linkDiscord;
    private String linkTelegram;
}
