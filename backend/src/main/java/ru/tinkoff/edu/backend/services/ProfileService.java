package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditAccountDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditContactsDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMainInfoDTO;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;

@Service
public interface ProfileService {
  /**
   * Возвращает UserProfileDTO объект для отрисовки страницы основного профиля пользователя.
   *
   * @param id идентификатор пользователя.
   * @return объект для вставки данных на основной странице профиля пользователя.
   * @see UserProfileDTO
   */
  UserProfileDTO getUserProfile(Long id);

  /**
   * Изменяет основную информацию о пользователе в базе данных. Значения полей без
   * аннотации @NotNull или @NotBlank стираются с базы данных, если их значение null. Остальные поля
   * просто перезаписываются.
   *
   * @param id идентификатор пользователя.
   * @param user объект с данными для обновления информации.
   * @see UserEditMainInfoDTO
   */
  void updateMainInfoUser(Long id, UserEditMainInfoDTO user);

  /**
   * Изменяет данные аккаунта(логин и пароль) пользователя.
   *
   * @param id идентификатор пользователя.
   * @param user объект с данными для обновления информации.
   * @throws IncorrectCurrentPasswordException неверный текущий пароль.
   * @throws DifferentPasswordException новый пароль и повторный новый пароль различаются.
   * @throws OldPasswordRepeatNewPasswordException старый пароль и новый пароль совпадают.
   * @see UserEditAccountDTO
   */
  void updateAccountDetailsUser(Long id, UserEditAccountDTO user);
  /**
   * Изменяет контактную информацию о пользователе. Значения полей стираются с базы данных, если их
   * значение null.
   *
   * @param id идентификатор пользователя.
   * @param user объект с данными для обновления информации.
   * @see UserEditContactsDTO
   */
  void updateContactsUser(Long id, UserEditContactsDTO user);

  /**
   * Возвращает UserEditMainInfoDTO объект с основной информацией пользователя.
   *
   * @param id идентификатор пользователя.
   * @return объект с основной информацией о пользователе.
   * @see UserEditMainInfoDTO
   */
  UserEditMainInfoDTO getMainInfoUser(Long id);

  /**
   * Возвращает UserEditAccountDTO объект с почтой пользователя.
   *
   * @param id идентификатор пользователя.
   * @return объект с почтой пользователя.
   * @see UserEditAccountDTO
   */
  UserEditAccountDTO getAccountDetailsUser(Long id);

  /**
   * Возвращает UserEditContactsDTO объект со ссылками на социальные сети пользователя.
   *
   * @param id идентификатор пользователя.
   * @return объект со ссылками на социальные сети пользователя.
   * @see UserEditContactsDTO
   */
  UserEditContactsDTO getContactsUser(Long id);
}
