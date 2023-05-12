package ru.tinkoff.edu.backend.entities.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.tinkoff.edu.backend.entities.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "FEEDBACKS")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Feedback {
    @EmbeddedId
    private FeedbackPK id = new FeedbackPK();

    private int rating;
    @Column(length = 400)
    private String text;
    @CreatedDate
    @NotNull
    @Column(name = "datetime")
    private LocalDate createAt;

    @ManyToOne
    @MapsId("mentorId")
    @JoinColumn(name = "mentor_id")
    private User mentor;
    @ManyToOne
    @MapsId("userAuthorId")
    @JoinColumn(name = "user_author_id")
    private User userAuthor;
}
