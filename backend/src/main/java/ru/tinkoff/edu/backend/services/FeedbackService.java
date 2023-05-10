package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackListPageDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackParamsDTO;


@Service
public interface FeedbackService {
    void addFeedback(FeedbackDTO feedback);
    void deleteFeedback(Long mentorId, Long userAuthorId);
    FeedbackListPageDTO getFeedbackWithPage(FeedbackParamsDTO dto);
}
