package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;
import ru.tinkoff.edu.backend.entities.feedback.FeedbackPK;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, FeedbackPK> {
  @Query(
      "SELECT f FROM Feedback f "
          + "where f.id.mentorId = :mentorId and f.id.userAuthorId = :userAuthorId")
  Optional<Feedback> getFeedbackById(Long mentorId, Long userAuthorId);

  Page<Feedback> getFeedbacksByMentor(Pageable pageable, User mentor);
}
