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
        query.setParameter("userId",dto.getUserId());

        int totalResults = query.getResultList().size();

        query.setFirstResult(dto.getOffset() * dto.getLimit());
        query.setMaxResults(dto.getLimit());

        List<User> resultList = query.getResultList();

        return new PageImpl<>(
                resultList,
                PageRequest.of(dto.getOffset(), dto.getLimit()),
                totalResults
        );
    }
}
