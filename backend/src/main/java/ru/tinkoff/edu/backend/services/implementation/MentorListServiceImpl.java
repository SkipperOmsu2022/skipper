package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.data.domain.Page;
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
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.*;
import java.util.stream.Collectors;

import static ru.tinkoff.edu.backend.mappers.PageUsersMapper.mapperToMentorListPageSortDTO;

@Service
public class MentorListServiceImpl implements MentorListService {
  private final UserRepository userRepository;
  private final QualificationRepository qualificationRepository;

  public MentorListServiceImpl(
      UserRepository userRepository, QualificationRepository qualificationRepository) {
    this.userRepository = userRepository;
    this.qualificationRepository = qualificationRepository;
  }

  @Override
  public MentorListPageSortDTO getMentorListPageSortFilter(FilterSortPaginationMentorListDTO dto) {
    MentorListPageSortDTO mentors =
        getMentorsWithNumberFeedBacks(userRepository.getPageableMentors(dto));
    return dto.getUserId() == null ? mentors : getMentorsWithFavorites(mentors, dto);
  }

  /**
   * Запрашивает с БД список избранных пользователей, проходиться по списку mentors и устанавливает
   * флаг favorite, если id ментора есть в списке избранных.
   */
  private MentorListPageSortDTO getMentorsWithFavorites(
      MentorListPageSortDTO mentors, FilterSortPaginationMentorListDTO dto) {
    Set<Long> listIdFavorite =
        userRepository
            .getPageableFavoriteMentorsForUserId(dto.getUserId(), dto.getOffset(), dto.getLimit())
            .stream()
            .map(User::getId)
            .collect(Collectors.toSet());

    return mentors.setContent(
        mentors.getContent().stream()
            .map(e -> listIdFavorite.contains(e.getId()) ? e.favorite() : e)
            .collect(Collectors.toList()));
  }

  @Override
  public MentorListPageSortDTO getFavoritesMentorListPage(FavoritesPaginationMentorListDTO dto) {
    MentorListPageSortDTO mentors =
        getMentorsWithNumberFeedBacks(
            userRepository.getPageableFavoriteMentorsForUserId(
                dto.getUserId(), dto.getOffset(), dto.getLimit()));

    return mentors.setContent(
        mentors.getContent().stream()
            .map(MentorListItemDTO::favorite)
            .collect(Collectors.toList()));
  }

  private MentorListPageSortDTO getMentorsWithNumberFeedBacks(Page<User> pages) {
    return mapperToMentorListPageSortDTO(pages);
  }

  @Override
  public List<Qualification> getSpecializationMentorList(String query) {
    return qualificationRepository.getSpecializationMentorByNameContainsIgnoreCase(query);
  }

  @Override
  public Map<MentorSpecialization, String> getMapMentorSpecialization() {
    return MentorSpecialization.getMapMentorSpecialization();
  }
}
