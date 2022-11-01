package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.DTO.UserRegDTO;
import ru.tinkoff.edu.backend.entities.User;

@Service
public interface UserService {
    /**
     * Создание нового пользователя при регистрации.
     * @param user пользователь для записи в БД
     */
    User create(UserRegDTO user);

    /**
     * Поиск пользователя в базе данных по id.
     * @param id id пользователя для поиска в БД.
     */
    User readById(Long id);

    /**
     * Поиск пользователя в базе данных по email.
     * @param email email пользователя для поиска в БД.
     */
    User readByEmail(String email);
}
