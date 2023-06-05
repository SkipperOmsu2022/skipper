package ru.tinkoff.edu.backend.controllers.mentorlist;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.FavoritesPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

@RestController
@Validated
@Tag(
    name = "Mentors List Controller",
    description =
        "Получение списка всех менторов, карту специализаций и список образовательных специальностей.")
@RequestMapping(value = "/api")
@CrossOrigin
public interface MentorsListController {
  @Operation(
      summary =
          "Получение объекта/карты для сопоставления ключа и название специальности на кириллице.")
  @GetMapping("/list/specializations")
  ResponseEntity<Map<MentorSpecialization, String>> getMapMentorSpecialization();

  @Operation(summary = "Получение списка менторов с использованием пагинации и сортировки.")
  @GetMapping("/list/mentors/page_sort_filter")
  ResponseEntity<MentorListPageSortDTO> getMentorsListWithPageableAndSort(
      FilterSortPaginationMentorListDTO dto);

  @Operation(
      summary = "Список всех образовательных специальностей Российской Федерации.",
      description = "Основной документ - Приказ Росстандарта от 25.05.2017 №415-ст")
  @GetMapping("/list/edu")
  ResponseEntity<List<Qualification>> getEducationRU(@RequestParam String query) ;

  @Operation(
      summary = "Получение списка избранных менторов пользователя.",
      description = "Возвращает избранных менторов для указанного пользователя по id.")
  @GetMapping("/list/mentors/favorites/")
  ResponseEntity<MentorListPageSortDTO> getFavoritesMentorsListWithPageableAndSort(
      FavoritesPaginationMentorListDTO dto);
}
