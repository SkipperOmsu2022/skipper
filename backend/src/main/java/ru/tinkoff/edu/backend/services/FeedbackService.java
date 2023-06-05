package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackListPageDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackParamsDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;

import java.util.List;

@Service
public interface FeedbackService {
  void addFeedback(FeedbackDTO feedback);

  void deleteFeedback(Long mentorId, Long userAuthorId);

  FeedbackListPageDTO getPaginationListFeedback(FeedbackParamsDTO dto);

  List<Feedback> getLastFeedbacks(User mentor, Integer limit);

  FeedbackDTO getFeedback(Long mentorId, Long userAuthorId);
}
