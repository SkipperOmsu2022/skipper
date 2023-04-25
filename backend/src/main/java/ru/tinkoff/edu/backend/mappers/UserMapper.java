package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.entities.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static ru.tinkoff.edu.backend.mappers.EducationMapper.educationToEducationDTOs;
import static ru.tinkoff.edu.backend.mappers.WorkExperienceMapper.workExperienceToWorkExperienceDTOs;

public class UserMapper {
    private UserMapper() {
    }

    public static MentorListItemDTO userToMentorListItemDTO(User user) {
        if (user == null) {
            return null;
        }

        return MentorListItemDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .mentorSpecializations(user.getInlineMentorSpecializations())
                .aboutMeAsMentor(user.getAboutAsMentor())
                .imageUserResource(user.getImageUserResource())
                .rating(user.getRating())
                .build();
    }

    public static List<MentorListItemDTO> userToMentorListItemDTOs(List<User> users) {
        if (users == null) {
            return Collections.emptyList();
        }

        return users
                .stream()
                .map(UserMapper::userToMentorListItemDTO)
                .collect(Collectors.toList());
    }

    public static UserEditMentorDTO userToUserEditMentorDTO(User user) {
        if (user == null) {
            return null;
        }

        return UserEditMentorDTO.builder()
                .aboutMeAsMentor(user.getAboutAsMentor())
                .isEnabledMentorStatus(user.getIsEnabledMentorStatus())
                .mentorSpecializations(user.getMentorSpecializations())
                .educations(educationToEducationDTOs(user.getEducation()))
                .workExperiences(workExperienceToWorkExperienceDTOs(user.getWorkExperiences()))
                .certificatesResource(user.getCertificateResources())
                .build();
    }
}
