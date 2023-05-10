package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@Tag(name = "Feedback Controller",
        description = "Добавляет и удаляет избранного ментора.")
@RequestMapping(value = "/api")
@CrossOrigin
public class FeedbackController {

    @Operation(summary = "Добавление отзыва.")
    @PostMapping("/feedback/{mentorId}/{userId}")
    public ResponseEntity<Void> addFavoriteMentor(@PathVariable String mentorId, @PathVariable String userId) {

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Удаление отзыва.")
    @DeleteMapping("/feedback/{mentorId}/{userId}")
    public ResponseEntity<Void> deleteFavoriteMentor(@PathVariable String mentorId, @PathVariable String userId) {

        return ResponseEntity.ok().build();
    }
}
