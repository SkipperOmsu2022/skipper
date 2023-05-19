package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaContext;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class MentorRepositoryImpl implements MentorRepository {
    @PersistenceContext
    private final EntityManager entityManager;

    public MentorRepositoryImpl(JpaContext context) {
        this.entityManager = context.getEntityManagerByManagedType(User.class);
    }

    @Override
    public Page<User> getPageableMentors(FilterSortPaginationMentorListDTO dto) {
        String jpql = "SELECT new User(u, COALESCE(AVG(uf.rating), 0.0)) " +
                "FROM User u JOIN u.mentorSpecializations ms LEFT OUTER JOIN u.feedbacks uf " +
                "WHERE u.isEnabledMentorStatus=TRUE " +
                "AND ms IN :mentorSpecializations " +
                "AND UPPER(u.aboutAsMentor) LIKE UPPER(CONCAT('%', :query, '%')) " +
                "AND (:onlyWithPhoto = FALSE OR u.imageUserResource IS NOT NULL) " +
                "AND (:userId IS NULL OR u.id != :userId) " +
                "GROUP BY u.id, u.firstName, u.lastName, u.aboutAsMentor, u.imageUserResource, " +
                "u.dateBirth, u.about, u.userGender, u.isEnabledMentorStatus, " +
                "u.linkDiscord, u.linkSkype, u.linkTelegram, u.linkVk " +
                "ORDER BY " + dto.getSortField().getString();

        TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
        query.setParameter("mentorSpecializations", new HashSet<>(Arrays.asList(dto.getMentorSpecializations())));
        query.setParameter("query", dto.getQuery());
        query.setParameter("onlyWithPhoto", dto.getOnlyWithPhoto());
        query.setParameter("userId", dto.getUserId());

        return getPageableUser(query, dto.getOffset(), dto.getLimit());
    }

    @Override
    public Page<User> getPageableFavoriteMentorsForUserId(Long userId, int offset, int limit) {
        String jpql = "SELECT new User(fus, COALESCE(AVG(fs.rating), 0.0)) FROM User u " +
                    "JOIN u.favoriteUsers fus " +
                    "LEFT OUTER JOIN fus.feedbacks fs " +
                "where u.id = :userId " +
                "GROUP BY fus.id, INDEX(fus)" +
                "ORDER BY INDEX(fus)";

        TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
        query.setParameter("userId", userId);

        return getPageableUser(query, offset, limit);
    }

    protected Page<User> getPageableUser(TypedQuery<User> query, int offset, int limit) {
        int totalResults = query.getResultList().size();

        query.setFirstResult(offset * limit);
        query.setMaxResults(limit);

        List<User> resultList = query.getResultList();

        return new PageImpl<>(
                resultList,
                PageRequest.of(offset, limit),
                totalResults
        );
    }
}
