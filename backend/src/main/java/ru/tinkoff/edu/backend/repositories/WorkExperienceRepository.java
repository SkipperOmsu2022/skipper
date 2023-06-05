package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.entities.WorkExperience;
import ru.tinkoff.edu.backend.entities.WorkExperiencePK;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, WorkExperiencePK> {
  void deleteWorkExperiencesByUser(User user);
}
