package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.FeedbackDTO;
import ru.tinkoff.edu.backend.services.FeedbackService;

import javax.validation.Valid;

@RestController
@Validated
@Tag(name = "Feedback Controller",
        description = "Добавляет и удаляет избранного ментора.")
@RequestMapping(value = "/api/feedback")
@CrossOrigin
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @Operation(summary = "Добавление отзыва.")
    @PostMapping("/")
    public ResponseEntity<Void> addFavoriteMentor(@Valid @RequestBody FeedbackDTO feedback) {
        feedbackService.addFeedback(feedback);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Удаление отзыва.")
    @DeleteMapping("/{mentorId}/{userAuthorId}")
    public ResponseEntity<Void> deleteFavoriteMentor(@PathVariable Long mentorId, @PathVariable Long userAuthorId) {
        feedbackService.deleteFeedback(mentorId, userAuthorId);
        return ResponseEntity.ok().build();
    }
}
