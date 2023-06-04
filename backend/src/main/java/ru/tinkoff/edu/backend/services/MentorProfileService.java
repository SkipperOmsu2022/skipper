package ru.tinkoff.edu.backend.services;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;

@Service
public interface MentorProfileService {
  /**
   * Возвращает UserMentorProfileDTO объект для отрисовки на странице профиля ментора.
   *
   * @param mentorId идентификатор пользователя.
   * @return объект для вставки данных на странице профиля ментора.
   * @see UserMentorProfileDTO
   */
  UserMentorProfileDTO getUserMentorProfile(Long mentorId, @Nullable Long userId);

  /**
   * Изменяет менторскую информацию пользователя.<br>
   * Поля типа множества Set записываются заново (удаляется связанная информация, затем записывается
   * новая). Пустое множество Set удаляет связанную информацию.<br>
   * Сертификаты пользователя удаляются, затем записываются новые.
   *
   * @param id идентификатор пользователя.
   * @param user объект с данными для обновления информации.
   * @param certificates массив сертификатов.
   * @see UserEditMentorDTO
   */
  void updateMentorInfo(Long id, UserEditMentorDTO user, MultipartFile[] certificates);

  /**
   * Возвращает UserEditMentorDTO объект с менторской информацией о пользователе.
   *
   * @param id идентификатор пользователя.
   * @return объект с менторской информацией о пользователе.
   * @see UserEditMentorDTO
   */
  UserEditMentorDTO getMentorInfo(Long id);
}
