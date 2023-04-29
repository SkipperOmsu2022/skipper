package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.FavoritesPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import java.util.List;
import java.util.Map;

@Service
public interface MentorListService {
    List<MentorListItemDTO> getMentorList();

    MentorListPageSortDTO getMentorListPageSortFilter(FilterSortPaginationMentorListDTO dto);

    List<Qualification> getSpecializationMentorList(String query);

    Map<MentorSpecialization, String> getMapMentorSpecialization();

    MentorListPageSortDTO getFavoritesMentorListPage(FavoritesPaginationMentorListDTO dto);
}
