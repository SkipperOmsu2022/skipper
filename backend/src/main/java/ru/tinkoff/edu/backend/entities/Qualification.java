package ru.tinkoff.edu.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Qualifications")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Qualification implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;
    @Column(nullable = false)
    private String name;
    @JsonIgnore
    public String getNameWithCode() {
        return this.code + " " + this.name;
    }
}
