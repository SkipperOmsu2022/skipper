package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, MentorRepository {
    User findByEmail(String email);

    List<User> findAllByIsEnabledMentorStatusTrue();

    @Query("SELECT count(uf)>0 FROM User u JOIN u.favoriteUsers uf " +
            "WHERE (u.id = :userId AND uf.id = :mentorId)")
    boolean hasUserInListOfFavoritesById(Long userId, Long mentorId);
}
