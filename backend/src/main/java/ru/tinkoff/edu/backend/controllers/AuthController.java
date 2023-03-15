package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
import ru.tinkoff.edu.backend.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.xml.ws.spi.http.HttpContext;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Регистрацию пользователя</li>
 *      <li> Аутентификацию пользователя</li>
 * </ul>
 */
@RestController
@Validated
@Log4j2
@Tag(name="Auth Controller", description="Регистрацию и аутентификацию пользователей.")
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
                    content = @Content(schema = @Schema(hidden = true)),
                    headers = {@Header(name = "Location", description = "/api/user/{id}",
                            schema = @Schema(example = "/api/user/5")),
                    }
            ) })
    @PostMapping("/registration")
    public ResponseEntity<Void> registration(@Valid @RequestBody UserRegDTO user, HttpServletRequest httpServletRequest) {
        log.info("remote adderss:" + httpServletRequest.getRemoteAddr());


        String id = userService.create(user).getId().toString();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header("Location", id)
                .build();
    }

    @Operation(summary = "Аутентификация пользователя",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = {@Content(mediaType = "multipart/form-data")}))
    @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid UserLoginDTO user, HttpServletRequest httpServletRequest) {
        // можно узнать ip отправителя
        log.info("remote host:" + httpServletRequest.getRemoteHost());
        log.info("remote address:" + httpServletRequest.getRemoteAddr());
        log.info("remote user:" + httpServletRequest.getRemoteUser());
        log.info("request url:" + httpServletRequest.getRequestURL());
        log.info("remote port:" + httpServletRequest.getRemotePort());

        String id = userService.readByUserLoginDTO(user).getId().toString();
        return ResponseEntity
                .ok()
                .header("Location", id)
                .build();
    }
}
