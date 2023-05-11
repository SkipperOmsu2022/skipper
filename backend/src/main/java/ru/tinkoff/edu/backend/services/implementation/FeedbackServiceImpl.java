package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackListPageDTO;
import ru.tinkoff.edu.backend.dto.feedback.FeedbackParamsDTO;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;
import ru.tinkoff.edu.backend.entities.feedback.FeedbackPK;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.AddingFeedbackException;
import ru.tinkoff.edu.backend.repositories.FeedbackRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.FeedbackService;

import java.util.List;

import static ru.tinkoff.edu.backend.mappers.FeedbackMapper.feedbackDTOToFeedback;
import static ru.tinkoff.edu.backend.mappers.FeedbackMapper.feedbackToFeedbackDTOs;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private final UserRepository userRepository;
    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(UserRepository userRepository, FeedbackRepository feedbackRepository) {
        this.userRepository = userRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public void addFeedback(FeedbackDTO feedback) {
        if (feedback.getMentorId().equals(feedback.getUserAuthorId())) {
            throw new AddingFeedbackException("Невозможно добавить отзыв на самого себя!");
        }

        User mentor = userRepository.getReferenceById(feedback.getMentorId());
        User userAuthor = userRepository.getReferenceById(feedback.getUserAuthorId());

        userRepository.save(
                mentor.addFeedback(
                        feedbackDTOToFeedback(
                                mentor,
                                userAuthor,
                                feedback
                        )
                )
        );
    }

    @Override
    public void deleteFeedback(Long mentorId, Long userAuthorId) {
        feedbackRepository.deleteById(new FeedbackPK(mentorId, userAuthorId));
    }

    @Override
    public FeedbackListPageDTO getFeedbackWithPage(FeedbackParamsDTO dto) {
        Page<Feedback> page = feedbackRepository.getFeedbacksByMentor(
                userRepository.getReferenceById(dto.getUserId()),
                PageRequest.of(dto.getOffset(), dto.getLimit())
        );
        return FeedbackListPageDTO.builder()
                .content(feedbackToFeedbackDTOs(page.getContent()))
                .totalElement(page.getTotalElements())
                .build();
    }

    public List<Feedback> getLastFeedback(User mentor) {
        return feedbackRepository.getFeedbacksByMentor(mentor, PageRequest
                .of(0, 4, Sort.by(Sort.Direction.DESC, "dateTime"))
        ).getContent();
    }

    public Double getTotalRatingUser(Long userId) {
        return feedbackRepository.getTotalRatingUser(userId);
    }
}
