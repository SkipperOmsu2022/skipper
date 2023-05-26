package ru.tinkoff.edu.backend.mappers;

import lombok.extern.slf4j.Slf4j;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static ru.tinkoff.edu.backend.mappers.EducationMapper.educationToEducationDTOs;
import static ru.tinkoff.edu.backend.mappers.FeedbackMapper.mapperToFeedbackDTOs;
import static ru.tinkoff.edu.backend.mappers.WorkExperienceMapper.workExperienceToWorkExperienceDTOs;

@Slf4j
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
                .numberFeedbacks(user.getNumberOfFeedbacks())
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

    public static UserMentorProfileDTO userToUserMentorProfileDTO(User user, boolean isFavorite,
                                                                  List<Feedback> feedbacks) {
        if (user == null) {
            return null;
        }

        return UserMentorProfileDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .patronymic(user.getPatronymic())
                .aboutAsMentor(user.getAboutAsMentor())
                .isEnabledMentorStatus(user.getIsEnabledMentorStatus())

                .mentorSpecializations(user.getInlineMentorSpecializations())
                .educations(educationToEducationDTOs(user.getEducation()))
                .workExperiences(workExperienceToWorkExperienceDTOs(user.getWorkExperiences()))
                .certificatesResource(user.getCertificateResources())

                .imageUserResource(user.getImageUserResource())
                .dateOfRegistration(user.getDateOfRegistration())

                .linkVk(user.getLinkVk())
                .linkSkype(user.getLinkSkype())
                .linkDiscord(user.getLinkDiscord())
                .linkTelegram(user.getLinkTelegram())

                .isFavorite(isFavorite)

                .feedbacks(mapperToFeedbackDTOs(feedbacks))
                .rating(user.getRating())
                .numberFeedbacks(user.getNumberOfFeedbacks())

                .build();
    }
}
