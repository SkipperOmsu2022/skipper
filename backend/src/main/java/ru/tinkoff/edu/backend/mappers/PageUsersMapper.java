package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;

import java.util.List;

public class PageUsersMapper {
    private PageUsersMapper() {
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
