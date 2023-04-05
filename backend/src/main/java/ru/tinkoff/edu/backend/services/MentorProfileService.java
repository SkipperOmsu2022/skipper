package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;

@Service
public interface MentorProfileService {
    /**
     * Возвращает UserMentorProfileDTO объект для отрисовки на странице профиля ментора.
     *
     * @param id идентификатор пользователя.
     * @return объект для вставки данных на странице профиля ментора.
     * @see UserMentorProfileDTO
     */
    UserMentorProfileDTO getUserMentorProfile(Long id);

    /**
     * Изменяет менторскую информацию пользователя.<br>
     * Поля типа множества Set записываются заново (удаляется связанная информация, затем записывается новая).
     * Пустое множество Set удаляет связанную информацию.
     *
     * @param id идентификатор пользователя.
     * @param user объект с данными для обновления информации.
     * @see UserEditMentorDTO
     */
    void updateMentorInfo(Long id, UserEditMentorDTO user);

    /**
     * Возвращает UserEditMentorDTO объект с менторской информацией о пользователе.
     *
     * @param id идентификатор пользователя.
     * @return объект с менторской информацией о пользователе.
     * @see UserEditMentorDTO
     */
    UserEditMentorDTO getMentorInfo(Long id);
}
