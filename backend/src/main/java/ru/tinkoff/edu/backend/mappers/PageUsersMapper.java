package ru.tinkoff.edu.backend.mappers;

import org.springframework.data.domain.Page;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.User;

import static ru.tinkoff.edu.backend.mappers.UserMapper.userToMentorListItemDTOs;

public class PageUsersMapper {
    private PageUsersMapper() {
    }

    public static MentorListPageSortDTO pageUsersToMentorListPageSortDTO(Page<User> pages) {
        return MentorListPageSortDTO.builder()
                .content(userToMentorListItemDTOs(pages.getContent()))
                .totalElement(pages.getTotalElements())
                .build();
    }
}
