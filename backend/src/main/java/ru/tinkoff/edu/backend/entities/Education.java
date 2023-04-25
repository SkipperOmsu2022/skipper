package ru.tinkoff.edu.backend.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Educations")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Education {
    @EmbeddedId
    private EducationPK id = new EducationPK();
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    @OneToOne
    @MapsId("qualificationId")
    @JoinColumn(name = "qualification_id")
    private Qualification qualification;

    @Column(nullable = false)
    private Integer yearStart;
    @Column
    private Integer yearEnd;
    @Column(nullable = false)
    private String educationalInstitution;
}
