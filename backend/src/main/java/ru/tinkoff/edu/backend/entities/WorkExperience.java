package ru.tinkoff.edu.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "work_experiences")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperience {
  @EmbeddedId private WorkExperiencePK id = new WorkExperiencePK();

  @Column(name = "year_end")
  private Integer yearEnd;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "user_id")
  private User user;
}
