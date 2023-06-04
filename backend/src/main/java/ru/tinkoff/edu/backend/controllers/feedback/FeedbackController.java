package ru.tinkoff.edu.backend.controllers.feedback;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackListPageDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackParamsDTO;

@RestController
@Validated
@Tag(name = "Feedback Controller", description = "Добавляет и удаляет избранного ментора.")
@RequestMapping(value = "/api/feedback")
@CrossOrigin
public interface FeedbackController {
  @Operation(
      summary = "Добавление отзыва.",
      description = "Перезаписывает отзыв, если он существует.")
  @PostMapping("/")
  ResponseEntity<Void> addFeedback(@Valid @RequestBody FeedbackDTO feedback);

  @Operation(summary = "Удаление отзыва.")
  @DeleteMapping("/{mentorId}/{userAuthorId}")
  ResponseEntity<Void> deleteFeedback(@PathVariable Long mentorId, @PathVariable Long userAuthorId);

  @Operation(summary = "Отзыв ментора от конкретного пользователя.")
  @GetMapping("/{mentorId}/{userAuthorId}")
  ResponseEntity<FeedbackDTO> getFeedback(
      @PathVariable Long mentorId, @PathVariable Long userAuthorId);

  @Operation(summary = "Отзывы ментора.")
  @GetMapping("/")
  ResponseEntity<FeedbackListPageDTO> getFeedbacks(@Valid FeedbackParamsDTO dto);
}
