package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.FeedbackDTO;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;
import ru.tinkoff.edu.backend.entities.feedback.FeedbackPK;
import ru.tinkoff.edu.backend.entities.User;

public class FeedbackMapper {
    private FeedbackMapper() {
    }

    public static Feedback feedbackDTOToFeedback(User mentor, User userAuthor, FeedbackDTO feedback) {
        if (feedback == null) {
            return null;
        }

        return Feedback.builder()
                .id(new FeedbackPK(mentor.getId(), userAuthor.getId()))
                .mentor(mentor)
                .userAuthor(userAuthor)
                .rating(feedback.getRating())
                .text(feedback.getText())
                .build();
    }
}
