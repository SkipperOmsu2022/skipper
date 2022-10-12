package ru.tinkoff.edu.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.DTO.UserLoginDTO;
import ru.tinkoff.edu.backend.DTO.UserRegDTO;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Регестрацию пользователя</li>
 *      <li> Авторизацию пользователя</li>
 *      <li> Изменение данных пользователя</li>
 * </ul>
 */
@RestController
public class UserController {
    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody UserRegDTO newUser) {
        System.out.println(newUser);
        final boolean correct = newUser.getFirstName() != null
                && newUser.getLastName() != null
                && newUser.getPassword() != null
                && newUser.getEmail() != null;
        return correct ?
                new ResponseEntity<>(HttpStatus.CREATED) :
                new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}
