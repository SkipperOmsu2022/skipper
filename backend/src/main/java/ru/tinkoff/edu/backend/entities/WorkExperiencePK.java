package ru.tinkoff.edu.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperiencePK implements Serializable {
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "place_of_work", nullable = false, unique = true)
    private String placeOfWork;
    @Column(name = "date_start", nullable = false, columnDefinition = "DATE")
    private LocalDate dateStart;
}
