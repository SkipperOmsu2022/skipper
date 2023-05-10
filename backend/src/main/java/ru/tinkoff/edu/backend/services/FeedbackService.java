package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.FeedbackDTO;

@Service
public interface FeedbackService {
    void addFeedback(FeedbackDTO feedback);
    void deleteFeedback(Long mentorId, Long userAuthorId);
}
