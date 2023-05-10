package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;
import ru.tinkoff.edu.backend.entities.feedback.FeedbackPK;
import ru.tinkoff.edu.backend.entities.User;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    public static FeedbackDTO feedbackToFeedbackDTO(Feedback feedback) {
        if (feedback == null) {
            return null;
        }

        return FeedbackDTO.builder()
                .mentorId(feedback.getMentor().getId())
                .userAuthorId(feedback.getUserAuthor().getId())
                .dateTime(feedback.getDateTime())
                .rating(feedback.getRating())
                .text(feedback.getText())
                .build();
    }

    public static List<FeedbackDTO> feedbackToFeedbackDTOs(List<Feedback> feedbacks) {
        if (feedbacks == null) {
            return Collections.emptyList();
        }

        return feedbacks.stream()
                .map(FeedbackMapper::feedbackToFeedbackDTO)
                .collect(Collectors.toList());
    }
}
