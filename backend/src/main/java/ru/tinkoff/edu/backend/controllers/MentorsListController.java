package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.FavoritesPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.List;
import java.util.Map;

@RestController
@Validated
@Tag(name = "Mentors List Controller",
        description = "Получение списка всех менторов, карту специализаций и список образовательных специальностей.")
@RequestMapping(value = "/api")
@CrossOrigin
public class MentorsListController {
    private final MentorListService mentorListService;

    public MentorsListController(MentorListService mentorListService) {
        this.mentorListService = mentorListService;
    }

    @Operation(summary = "Получение объекта/карты для сопоставления ключа и название специальности на кириллице.")
    @GetMapping("/list/specializations")
    public ResponseEntity<Map<MentorSpecialization, String>> getMapMentorSpecialization() {
        return ResponseEntity.ok(mentorListService.getMapMentorSpecialization());
    }

    @Operation(summary = "Получение списка менторов.")
    @GetMapping("/list/mentors")
    public ResponseEntity<List<MentorListItemDTO>> getMentorsList() {
        return ResponseEntity.ok(mentorListService.getMentorList());
    }

    @Operation(summary = "Получение списка менторов с использованием пагинации и сортировки.")
    @GetMapping("/list/mentors/page_sort_filter")
    public ResponseEntity<MentorListPageSortDTO> getMentorsListWithPageableAndSort(
            FilterSortPaginationMentorListDTO dto
    ) {
        return ResponseEntity.ok(mentorListService.getMentorListPageSortFilter(dto));
    }

    @Operation(summary = "Список всех образовательных специальностей Российской Федерации.",
            description = "Основной документ - Приказ Росстандарта от 25.05.2017 №415-ст")
    @GetMapping("/list/edu")
    public ResponseEntity<List<Qualification>> getEducationRU(@RequestParam String query) {
        return ResponseEntity.ok(mentorListService.getSpecializationMentorList(query));
    }

    @Operation(summary = "Получение списка избранных менторов пользователя.",
            description = "Возвращает избранных менторов для указанного пользователя по id.")
    @GetMapping("/list/mentors/favorites/")
    public ResponseEntity<MentorListPageSortDTO> getFavoritesMentorsListWithPageableAndSort(
            FavoritesPaginationMentorListDTO dto
    ) {
        return ResponseEntity.ok(mentorListService.getFavoritesMentorListPage(dto));
    }
}
