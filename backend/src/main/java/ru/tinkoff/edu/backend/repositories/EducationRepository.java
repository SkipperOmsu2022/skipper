package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.Education;
import ru.tinkoff.edu.backend.entities.EducationPK;
import ru.tinkoff.edu.backend.entities.User;


@Repository
public interface EducationRepository extends JpaRepository<Education, EducationPK> {
    void deleteEducationsByUser(User user);
}
