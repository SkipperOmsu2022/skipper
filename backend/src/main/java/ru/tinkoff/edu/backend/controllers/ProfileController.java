package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.DTO.UserMainInfoDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.enums.UserGender;
import ru.tinkoff.edu.backend.services.UserService;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Изменения данных пользователя</li>
 * </ul>
 */
@RestController
@Validated
@Tag(name="Profile Controller", description="Контроллер отвечает за изменение данных в профиле пользователя.")
@RequestMapping(value = "/api/user")
@CrossOrigin
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> mainInfo(@PathVariable Long id) {
        User userFromDB = userService.readById(id);
        if(userFromDB == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("User not found!");
        }

        UserMainInfoDTO user = new UserMainInfoDTO();
        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setGender(UserGender.MALE);

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Location", "/api/user/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }
}
