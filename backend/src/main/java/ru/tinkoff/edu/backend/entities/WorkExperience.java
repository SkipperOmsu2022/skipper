package ru.tinkoff.edu.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "WorkExperience")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperience {
    @EmbeddedId
    private WorkExperiencePK id = new WorkExperiencePK();
    @Column(columnDefinition = "DATE")
    private LocalDate dateEnd;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
}
