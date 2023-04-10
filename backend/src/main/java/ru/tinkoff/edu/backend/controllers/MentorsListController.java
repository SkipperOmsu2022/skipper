package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.dto.MentorListPageSortDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.services.MentorListService;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;
import java.util.Map;

@RestController
@Validated
@Tag(name="Mentors List Controller",
        description="Получение списка всех менторов, карту специализаций и список образовательных специальностей.")
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
    @GetMapping("/list/page_sort/mentors")
    public ResponseEntity<MentorListPageSortDTO> getMentorsListWithPageableAndSort(
            @RequestParam(defaultValue = "0", required = false) @Min(0) Integer offset,
            @RequestParam(defaultValue = "30", required = false) @Min(1) @Max(100) Integer limit,
            @RequestParam(value = "sort", defaultValue = "id", required = false) String sortField
            ) {
        return ResponseEntity.ok(mentorListService.getMentorListPageSort(offset, limit, sortField));
    }

    @Operation(summary = "Список всех образовательных специальностей Российской Федерации.",
            description = "Основной документ - Приказ Росстандарта от 25.05.2017 №415-ст")
    @GetMapping("/list/edu")
    public ResponseEntity<List<Qualification>> getEducationRU(@RequestParam String query) {
        return ResponseEntity.ok(mentorListService.getSpecializationMentorList(query));
    }
}
