package ru.tinkoff.edu.backend.controllers.mentorlist;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.FavoritesPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.services.MentorListService;

public class MentorsListControllerImpl implements MentorsListController {
  private final MentorListService mentorListService;

  public MentorsListControllerImpl(MentorListService mentorListService) {
    this.mentorListService = mentorListService;
  }

  @Override
  public ResponseEntity<Map<MentorSpecialization, String>> getMapMentorSpecialization() {
    return ResponseEntity.ok(mentorListService.getMapMentorSpecialization());
  }

  @Override
  public ResponseEntity<MentorListPageSortDTO> getMentorsListWithPageableAndSort(
      FilterSortPaginationMentorListDTO dto) {
    return ResponseEntity.ok(mentorListService.getMentorListPageSortFilter(dto));
  }

  @Override
  public ResponseEntity<List<Qualification>> getEducationRU(@RequestParam String query) {
    return ResponseEntity.ok(mentorListService.getSpecializationMentorList(query));
  }

  @Override
  public ResponseEntity<MentorListPageSortDTO> getFavoritesMentorsListWithPageableAndSort(
      FavoritesPaginationMentorListDTO dto) {
    return ResponseEntity.ok(mentorListService.getFavoritesMentorListPage(dto));
  }
}
