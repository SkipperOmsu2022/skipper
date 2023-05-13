package ru.tinkoff.edu.backend.mappers;

import org.springframework.data.domain.Page;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackListPageDTO;
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
        if (feedback == null || userAuthor == null || mentor == null) {
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
                .createAt(feedback.getCreateAt())
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

    public static FeedbackListPageDTO mapperToFeedbackListPageDTO(Page<Feedback> pages) {
        if(pages == null) {
            return null;
        }

        return FeedbackListPageDTO.builder()
                .content(feedbackToFeedbackDTOs(pages.getContent()))
                .totalElement(pages.getTotalElements())
                .build();
    }
}
