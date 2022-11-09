package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.DTO.UserRegDTO;
import ru.tinkoff.edu.backend.services.UserService;

import javax.validation.Valid;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Регестрацию пользователя</li>
 *      <li> Авторизацию пользователя</li>
 * </ul>
 */
@RestController
@Validated
@Tag(name="Auth Controller", description="Контроллер отвечает за регистрацию и аутентификацию пользователей.")
@RequestMapping(value = "/api/auth")
@CrossOrigin
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Operation(summary = "Регистрация пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Успешная регистрация",
                    content = {@Content(mediaType = "application/json" )},
                    headers = {@Header(name = "Location", description = "/api/user/{id}",
                            schema = @Schema(example = "/api/user/5")),
                    }),
            @ApiResponse(responseCode = "400", description = "Пользователь уже существует!",
                    content = {@Content(mediaType = "text/plain")}

            ) })
    @PostMapping("/registration")
    public ResponseEntity<?> registration(@Valid @RequestBody UserRegDTO user) {
        user.setEmail(user.getEmail().toLowerCase());
        if(userService.readByEmail(user.getEmail()) != null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("User already exist!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String id = userService.create(user).getId().toString();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header("Location", "/api/user/" + id)
                .build();
    }

    @GetMapping("/login/fail")
    public ResponseEntity<?> login() {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Failed to log in!");
    }
}
