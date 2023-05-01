package ru.tinkoff.edu.backend.mappers;

import org.springframework.data.domain.Page;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.User;

import java.util.List;

import static ru.tinkoff.edu.backend.mappers.UserMapper.userToMentorListItemDTOs;

public class PageUsersMapper {
    private PageUsersMapper() {
    }

    public static MentorListPageSortDTO pageUsersToMentorListPageSortDTO(Page<User> pages) {
        if (pages == null) {
            return null;
        }

        return MentorListPageSortDTO.builder()
                .content(userToMentorListItemDTOs(pages.getContent()))
                .totalElement(pages.getTotalElements())
                .build();
    }

    public static MentorListPageSortDTO listMentorListItemDTOToMentorListPageSortDTO(List<MentorListItemDTO> list, Long total) {
        if (list == null || total == null) {
            return null;
        }

        return MentorListPageSortDTO.builder()
                .content(list)
                .totalElement(total)
                .build();
    }
}
