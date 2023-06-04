package ru.tinkoff.edu.backend.controllers.profile.settings.mentor;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;

/**
 * Данный контроллер отвечает за:
 *
 * <ul>
 *   <li>Изменения менторских данных пользователя.
 * </ul>
 */
@RestController
@Validated
@Tag(
    name = "Mentor Profile Settings Controller",
    description = "Изменение менторских данных в профиле пользователя.")
@RequestMapping(value = "/api/user/profile/settings/mentor")
@CrossOrigin
public interface MentorProfileSettingsController {
  @Operation(summary = "Получение информации о менторских настройках пользователя.")
  @GetMapping("/{id}")
  ResponseEntity<UserEditMentorDTO> getMentorSettings(@PathVariable Long id);

  @Operation(
      summary = "Изменение информации о менторских настройках пользователя.",
      description =
          "Менторские специальности и менторское образование перезаписывается! В каждом запросе нужно"
              + "отправлять всё что нужно сохранить! Вес одного сертификаты не более 3МБ. Совокупный вес всех"
              + "сертификатов не более 9 МБ. Максимальное количество сертификатов: 3.")
  @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
  @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ResponseEntity<Void> editMentorSettings(
      @PathVariable Long id,
      @RequestPart("info") @Valid UserEditMentorDTO user,
      @Nullable
          @Size(message = "Максимальное количество файлов: 3", max = 3)
          @RequestPart("certificates")
          MultipartFile[] certificates);
}
