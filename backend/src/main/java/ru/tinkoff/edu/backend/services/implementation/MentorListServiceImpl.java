package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.FavoritesPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.repositories.QualificationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.FeedbackService;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.*;
import java.util.stream.Collectors;

import static ru.tinkoff.edu.backend.mappers.PageUsersMapper.listMentorListItemDTOToMentorListPageSortDTO;
import static ru.tinkoff.edu.backend.mappers.UserMapper.userToMentorListItemDTOs;

@Service
public class MentorListServiceImpl implements MentorListService {
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;
    private final FeedbackService feedbackService;

    public MentorListServiceImpl(UserRepository userRepository, QualificationRepository qualificationRepository, FeedbackService feedbackService) {
        this.userRepository = userRepository;
        this.qualificationRepository = qualificationRepository;
        this.feedbackService = feedbackService;
    }

    @Override
    public List<MentorListItemDTO> getMentorList() {
        return userToMentorListItemDTOs(userRepository.findAllByIsEnabledMentorStatusTrue());
    }

    @Override
    public MentorListPageSortDTO getMentorListPageSortFilter(FilterSortPaginationMentorListDTO dto) {
        if (dto.getUserId() == null) {
            return getMentorListFromFilterDTO(dto);
        } else {
            return getMentorListWithFavoritesFromFilterDTO(dto);
        }
    }

    private MentorListPageSortDTO getMentorListFromFilterDTO(FilterSortPaginationMentorListDTO dto) {
        Page<User> pages = userRepository
                .getAllMentorsWithPageSortAndFilter(
                        PageRequest.of(dto.getOffset(), dto.getLimit())
                                .withSort(Sort.Direction.ASC, dto.getSortField()),
                        dto.getMentorSpecializations(),
                        dto.getQuery(),
                        dto.getOnlyWithPhoto(),
                        null
                );
        return listMentorListItemDTOToMentorListPageSortDTO(
                userToMentorListItemDTOs(pages.getContent())
                        .stream()
                        .map(this::setRatingAndReturn)
                        .collect(Collectors.toList()),
                pages.getTotalElements()
        );
    }

    private MentorListPageSortDTO getMentorListWithFavoritesFromFilterDTO(FilterSortPaginationMentorListDTO dto) {
        Page<User> pages = userRepository.getAllMentorsWithPageSortAndFilter(
                PageRequest.of(dto.getOffset(), dto.getLimit())
                        .withSort(Sort.Direction.ASC, dto.getSortField()),
                dto.getMentorSpecializations(),
                dto.getQuery(),
                dto.getOnlyWithPhoto(),
                dto.getUserId()
        );
        List<MentorListItemDTO> listFavorite = userToMentorListItemDTOs(
                userRepository.getAllUsersFavoritesById(
                        PageRequest.of(dto.getOffset(), dto.getLimit()),
                        dto.getUserId()
                ).getContent()
        );
        List<MentorListItemDTO> listWithFavorite = userToMentorListItemDTOs(pages.getContent())
                .stream()
                .map(e -> listFavorite.contains(e) ? e.favorite() : e)
                .map(this::setRatingAndReturn)
                .collect(Collectors.toList());

        return listMentorListItemDTOToMentorListPageSortDTO(
                listWithFavorite,
                pages.getTotalElements()
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
        Page<User> pages = userRepository.getAllUsersFavoritesById(
                PageRequest.of(dto.getOffset(), dto.getLimit()),
                dto.getUserId()
        );

        return listMentorListItemDTOToMentorListPageSortDTO(
                userToMentorListItemDTOs(pages.getContent())
                        .stream()
                        .map(MentorListItemDTO::favorite)
                        .map(this::setRatingAndReturn)
                        .collect(Collectors.toList()),
                pages.getTotalElements()
        );
    }

    private MentorListItemDTO setRatingAndReturn(MentorListItemDTO mentor) {
        return mentor.setRating(
                feedbackService.getTotalRatingUser(mentor.getId())
        );
    }
}
