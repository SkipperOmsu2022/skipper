package ru.tinkoff.edu.backend.controllers.profile.settings;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditContactsDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditAccountDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMainInfoDTO;
import ru.tinkoff.edu.backend.services.ProfileService;

import javax.validation.Valid;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Изменения данных пользователя.</li>
 * </ul>
 */
@RestController
@Validated
@Tag(name="Profile Settings Controller", description="Изменение данных в профиле пользователя.")
@RequestMapping(value = "/api/user/profile/settings")
@CrossOrigin
@RequiredArgsConstructor
public class ProfileSettingsController {
    private final ProfileService profileService;

    @Operation(summary = "Получение основной информации об аккаунте пользователя.")
    @GetMapping("/{id}")
    public ResponseEntity<UserEditMainInfoDTO> getMainInfo(@PathVariable Long id) {
        UserEditMainInfoDTO userFromDB = profileService.getMainInfo(id);

        return ResponseEntity
                .ok(userFromDB);
    }

    @Operation(summary = "Изменение основных данных в профиле пользователя.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = {@Content(mediaType = "multipart/form-data")}))
    @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> editMainInfo(@PathVariable Long id,
                                               @Valid @ModelAttribute UserEditMainInfoDTO user ) {
        profileService.updateUser(id, user);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Получение почты пользователя.")
    @GetMapping("/account/{id}")
    public ResponseEntity<UserEditAccountDTO> getAccountDetails(@PathVariable Long id) {
        UserEditAccountDTO user = profileService.getAccountDetails(id);

        return ResponseEntity
                .ok(user);
    }

    @Operation(summary = "Изменение почты и пароля аккаунта пользователя.",
            description = "Ошибка будет возникать, если:\n" +
                    "1. Неверное введённый текущий(старый) пароль.\n" +
                    "2. Новый пароль и повторно введённый новый пароль - не совпадают.\n" +
                    "3. Новый пароль совпадает со старым паролем.")
    @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
    @PutMapping("/account/{id}")
    public ResponseEntity<Void> editAccountDetails(@PathVariable Long id, @Valid @RequestBody UserEditAccountDTO user) {
        profileService.updateUser(id, user);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Получение контактных данных(ссылок на социальные сети) пользователя.")
    @GetMapping("/contacts/{id}")
    public ResponseEntity<UserEditContactsDTO> getUserContacts(@PathVariable Long id) {
        UserEditContactsDTO user = profileService.getUserContacts(id);

        return ResponseEntity
                .ok(user);
    }

    @Operation(summary = "Изменение контактных данных(ссылок на социальные сети) пользователя.")
    @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
    @PutMapping("/contacts/{id}")
    public ResponseEntity<Void> editUserContacts(@PathVariable Long id, @Valid @RequestBody UserEditContactsDTO user) {
        profileService.updateUser(id, user);

        return ResponseEntity.ok().build();
    }
}
