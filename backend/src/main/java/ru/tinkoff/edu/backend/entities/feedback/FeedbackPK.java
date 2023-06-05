package ru.tinkoff.edu.backend.entities.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackPK implements Serializable {
  @Column(name = "mentor_id", nullable = false)
  private Long mentorId;

  @Column(name = "mentor_id", nullable = false)
  private Long userAuthorId;
}
