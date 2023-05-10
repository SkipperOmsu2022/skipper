package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.FeedbackDTO;
import ru.tinkoff.edu.backend.entities.feedback.FeedbackPK;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.AddingFeedbackException;
import ru.tinkoff.edu.backend.repositories.FeedbackRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.FeedbackService;

import static ru.tinkoff.edu.backend.mappers.FeedbackMapper.feedbackDTOToFeedback;

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
        if(feedback.getMentorId().equals(feedback.getUserAuthorId())) {
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
}
