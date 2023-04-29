package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findAllByIsEnabledMentorStatusTrue();

    @Query("SELECT DISTINCT u FROM User u JOIN u.mentorSpecializations ms " +
            "WHERE u.isEnabledMentorStatus=TRUE " +
            "AND ms IN :mentorSpecializations " +
            "AND UPPER(u.aboutAsMentor) LIKE UPPER(CONCAT('%', :query, '%')) " +
            "AND (:onlyWithPhoto = FALSE OR u.imageUserResource IS NOT NULL)"
    )
    Page<User> getAllMentorsWithPageSortAndFilter(
            Pageable pageable,
            MentorSpecialization[] mentorSpecializations,
            String query,
            Boolean onlyWithPhoto
    );

    @Query("SELECT uf FROM User u JOIN u.favoriteUsers uf " +
            "WHERE u.id = :id ORDER BY uf.id ASC"
    )
    Page<User> getAllUsersFavoritesById(Pageable pageable, Long id);
}
