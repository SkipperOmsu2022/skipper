package ru.tinkoff.edu.backend.controllers.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * Данный контроллер отвечает за:
 *
 * <ul>
 *   <li>Регистрацию пользователя
 *   <li>Аутентификацию пользователя
 * </ul>
 */
@RestController
@Validated
@Tag(name = "Auth Controller", description = "Регистрацию и аутентификацию пользователей.")
@RequestMapping(value = "/api/auth")
@CrossOrigin
public interface AuthController {

  @Operation(summary = "Регистрация пользователя")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "Успешная регистрация",
            content = @Content(schema = @Schema(hidden = true)),
            headers = {
              @Header(
                  name = "Location",
                  description = "/api/user/{id}",
                  schema = @Schema(example = "/api/user/5")),
            })
      })
  @PostMapping("/registration")
  ResponseEntity<Void> registration(
      @Valid @RequestBody UserRegDTO user, HttpServletRequest httpServletRequest);

  @Operation(summary = "Аутентификация пользователя")
  @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
  @PostMapping(value = "/login", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ResponseEntity<Void> login(@Valid UserLoginDTO user, HttpServletRequest httpServletRequest);
}
