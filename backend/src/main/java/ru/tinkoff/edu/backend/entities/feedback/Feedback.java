package ru.tinkoff.edu.backend.entities.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.entities.User;

import javax.persistence.*;

@Entity
@Table(name = "FEEDBACKS")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @EmbeddedId
    private FeedbackPK id = new FeedbackPK();

    private int rating;
    @Column(length = 400)
    private String text;

    @ManyToOne
    @MapsId("mentorId")
    @JoinColumn(name = "mentor_id")
    private User mentor;
    @ManyToOne
    @MapsId("userAuthorId")
    @JoinColumn(name = "user_author_id")
    private User userAuthor;
}
