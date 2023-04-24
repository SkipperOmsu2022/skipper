package ru.tinkoff.edu.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.entities.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "aboutMeAsMentor", source = "aboutAsMentor")
    @Mapping(target = "mentorSpecializations", expression = "java(user.getInlineMentorSpecializations())")
    MentorListItemDTO userToMentorListItemDTO(User user);

    List<MentorListItemDTO> userToMentorListItemDTOs(List<User> users);
}
