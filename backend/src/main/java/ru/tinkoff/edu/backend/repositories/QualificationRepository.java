package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.Qualification;

import java.util.List;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Long> {
  List<Qualification> getSpecializationMentorByNameContainsIgnoreCase(String query);
}
