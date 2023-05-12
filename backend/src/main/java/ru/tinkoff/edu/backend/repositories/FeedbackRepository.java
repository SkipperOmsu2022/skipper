package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;
import ru.tinkoff.edu.backend.entities.feedback.FeedbackPK;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, FeedbackPK> {
    Page<Feedback> getFeedbacksByMentor(User mentor, Pageable pageable);

    @Query("SELECT AVG(f.rating) FROM Feedback f " +
            "where f.id.mentorId = :userId")
    Double getTotalRatingUser(Long userId);
}
