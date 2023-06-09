package ru.tinkoff.edu.backend.entities;

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
public class EducationPK implements Serializable {
  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "qualification_id", nullable = false)
  private Long qualificationId;
}
