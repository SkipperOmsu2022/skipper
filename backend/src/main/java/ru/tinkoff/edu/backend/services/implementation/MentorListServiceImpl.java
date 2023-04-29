package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.FavoritesPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.repositories.QualificationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.*;

import static ru.tinkoff.edu.backend.mappers.PageUsersMapper.pageUsersToMentorListPageSortDTO;
import static ru.tinkoff.edu.backend.mappers.UserMapper.userToMentorListItemDTOs;

@Service
public class MentorListServiceImpl implements MentorListService {
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;

    public MentorListServiceImpl(UserRepository userRepository, QualificationRepository qualificationRepository) {
        this.userRepository = userRepository;
        this.qualificationRepository = qualificationRepository;
    }

    @Override
    public List<MentorListItemDTO> getMentorList() {
        return userToMentorListItemDTOs(userRepository.findAllByIsEnabledMentorStatusTrue());
    }

    @Override
    public MentorListPageSortDTO getMentorListPageSortFilter(FilterSortPaginationMentorListDTO dto) {
        return pageUsersToMentorListPageSortDTO(
                userRepository
                        .getAllMentorsWithPageSortAndFilter(
                                PageRequest.of(dto.getOffset(), dto.getLimit())
                                        .withSort(Sort.Direction.ASC, dto.getSortFiled()),
                                dto.getMentorSpecializations(),
                                dto.getQuery(),
                                dto.getOnlyWithPhoto()
                        )
        );
    }

    @Override
    public List<Qualification> getSpecializationMentorList(String query) {
        return qualificationRepository.getSpecializationMentorByNameContainsIgnoreCase(query);
    }

    @Override
    public Map<MentorSpecialization, String> getMapMentorSpecialization() {
        return MentorSpecialization.getMapMentorSpecialization();
    }

    @Override
    public MentorListPageSortDTO getFavoritesMentorListPage(FavoritesPaginationMentorListDTO dto) {
        return pageUsersToMentorListPageSortDTO(
                userRepository.getAllUsersFavoritesById(
                        PageRequest.of(dto.getOffset(), dto.getLimit()),
                        dto.getUserId()
                )
        );
    }
}
