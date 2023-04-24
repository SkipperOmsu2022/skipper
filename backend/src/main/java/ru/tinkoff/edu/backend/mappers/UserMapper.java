package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.entities.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

        List<MentorListItemDTO> list = new ArrayList<>(users.size());
        for (User user : users) {
            list.add(userToMentorListItemDTO(user));
        }

        return list;
    }
}
