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
            "AND (:onlyWithPhoto = FALSE OR u.imageUserResource IS NOT NULL) " +
            "AND (:userId IS NULL OR u.id != :userId) " +
            "ORDER BY u.id"
    )
    Page<User> getAllMentorsWithPageSortAndFilterOrderByUserId(
            Pageable pageable,
            MentorSpecialization[] mentorSpecializations,
            String query,
            Boolean onlyWithPhoto,
            Long userId
    );

    @Query("SELECT new User(u, COALESCE(AVG(uf.rating), 0.0)) " +
            "FROM User u JOIN u.mentorSpecializations ms LEFT OUTER JOIN u.feedbacks uf " +
                    "WHERE u.isEnabledMentorStatus=TRUE " +
                        "AND ms IN :mentorSpecializations " +
                        "AND UPPER(u.aboutAsMentor) LIKE UPPER(CONCAT('%', :query, '%')) " +
                        "AND (:onlyWithPhoto = FALSE OR u.imageUserResource IS NOT NULL) " +
                        "AND (:userId IS NULL OR u.id != :userId) " +
                    "GROUP BY u.id, u.firstName, u.lastName, u.aboutAsMentor, u.imageUserResource, " +
                        "u.dateBirth, u.about, u.userGender, u.isEnabledMentorStatus, " +
                        "u.linkDiscord, u.linkSkype, u.linkTelegram, u.linkVk " +
                    "ORDER BY CASE :sort " +
                                    "WHEN 'id' THEN u.id " +
                                "END ASC, " +
                                "CASE :sort " +
                                    "WHEN 'rating' THEN COALESCE(AVG(uf.rating), 0.0) " +
                                "END DESC"
    )
    Page<User> getAllMentorsWithPageSortAndFilterOrderByRating(
            Pageable pageable,
            MentorSpecialization[] mentorSpecializations,
            String query,
            Boolean onlyWithPhoto,
            Long userId,
            String sort
    );

    @Query("SELECT uf FROM User u JOIN u.favoriteUsers uf " +
            "WHERE u.id = :id " +
            "ORDER BY INDEX(uf)"
    )
    Page<User> getAllUsersFavoritesById(Pageable pageable, Long id);

    @Query("SELECT count(uf)>0 FROM User u JOIN u.favoriteUsers uf " +
            "WHERE (u.id = :userId AND uf.id = :mentorId)")
    boolean hasUserInListOfFavoritesById(Long userId, Long mentorId);
}
