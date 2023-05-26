package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.domain.Page;
import ru.tinkoff.edu.backend.dto.FilterSortPaginationMentorListDTO;
import ru.tinkoff.edu.backend.entities.User;


public interface MentorRepository {
    Page<User> getPageableMentors(FilterSortPaginationMentorListDTO dto);

    Page<User> getPageableFavoriteMentorsForUserId(Long userId, int offset, int limit);
}
