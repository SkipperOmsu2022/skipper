package ru.tinkoff.edu.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Table(name = "Educations")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User userId;

    @ManyToOne
    private User userIdAuthor;
    @Min(1)
    @Max(5)
    private int rating;
    @Length(min = 10, max = 400)
    @Column(length = 400)
    private String text;
}
