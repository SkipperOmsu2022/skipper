package ru.tinkoff.edu.backend.controllers.feedback;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackListPageDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackParamsDTO;
import ru.tinkoff.edu.backend.services.FeedbackService;

@RestController
public class FeedbackControllerImpl implements FeedbackController {
  private final FeedbackService feedbackService;

  public FeedbackControllerImpl(FeedbackService feedbackService) {
    this.feedbackService = feedbackService;
  }

  @Override
  public ResponseEntity<Void> addFeedback(FeedbackDTO feedback) {
    feedbackService.addFeedback(feedback);
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> deleteFeedback(Long mentorId, Long userAuthorId) {
    feedbackService.deleteFeedback(mentorId, userAuthorId);
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<FeedbackDTO> getFeedback(Long mentorId, Long userAuthorId) {
    return ResponseEntity.ok(feedbackService.getFeedback(mentorId, userAuthorId));
  }

  @Override
  public ResponseEntity<FeedbackListPageDTO> getFeedbacks(FeedbackParamsDTO dto) {
    return ResponseEntity.ok(feedbackService.getPaginationListFeedback(dto));
  }
}
