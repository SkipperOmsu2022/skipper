package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.List;
import java.util.Map;

@RestController
@Validated
@Tag(name="Mentors List Controller",
        description="Получение списка всех менторов и карту специальностей.")
@RequestMapping(value = "/api")
@CrossOrigin
public class MentorsListController {
    private final MentorListService mentorListService;

    public MentorsListController(MentorListService mentorListService) {
        this.mentorListService = mentorListService;
    }

    @Operation(summary = "Получение объекта/карты для сопоставления ключа и название специальности на кирилице.")
    @GetMapping("/list/specializations")
    public ResponseEntity<Map<MentorSpecialization, String>> getMapMentorSpecialization() {
        return ResponseEntity.ok(MentorSpecialization.getMapMentorSpecialization());
    }

    @Operation(summary = "Получение списка менторов.")
    @GetMapping("/list/mentors")
    public ResponseEntity<List<MentorListItemDTO>> getMentorsList() {
        return ResponseEntity.ok(mentorListService.getMentorList());
    }
}
