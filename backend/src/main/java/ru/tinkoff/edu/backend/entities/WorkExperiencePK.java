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
public class WorkExperiencePK implements Serializable {
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "place_of_work", nullable = false)
    private String placeOfWork;
    @Column(name = "year_start", nullable = false)
    private Integer yearStart;
}
