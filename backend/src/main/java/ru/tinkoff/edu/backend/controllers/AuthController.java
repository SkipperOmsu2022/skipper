package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
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

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Регистрация пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Успешная регистрация",
                    content = {@Content(mediaType = "application/json" )},
                    headers = {@Header(name = "Location", description = "/api/user/{id}",
                            schema = @Schema(example = "/api/user/5")),
                    }),
            @ApiResponse(responseCode = "400", description = "User already exist!"
            ) })
    @PostMapping("/registration")
    public ResponseEntity<String> registration(@Valid @RequestBody UserRegDTO user) {
        String id = userService.create(user).getId().toString();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header("Location", "/api/user/" + id)
                .build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid UserLoginDTO user) {
        String id = userService.readByUserLoginDTO(user).getId().toString();
        return ResponseEntity
                .ok()
                .header("Location", "/api/user/" + id)
                .build();
    }
}
