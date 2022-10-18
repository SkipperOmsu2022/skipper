package ru.tinkoff.edu.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.DTO.UserLoginDTO;
import ru.tinkoff.edu.backend.DTO.UserRegDTO;
import ru.tinkoff.edu.backend.services.UserService;

import javax.validation.Valid;
//import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Регестрацию пользователя</li>
 *      <li> Авторизацию пользователя</li>
 *      <li> Изменение данных пользователя</li>
 * </ul>
 */
@RestController
@Validated
@RequestMapping(value = "/api/user")
public class UserController {
    private final UserService userService;
    //private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@Valid @RequestBody UserRegDTO user) {
        if(userService.readByEmail(user.getEmail()) != null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body("User already exist!");
        }

        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        String id = userService.create(user).getId().toString();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header("Location", "/api/user/" + id)
                .build();
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO user) {
        String id = userService.readByEmail(user.getEmail()).getId().toString();
        return ResponseEntity
                .ok()
                .header("Location", "/api/user/" + id)
                .build();
    }
}
