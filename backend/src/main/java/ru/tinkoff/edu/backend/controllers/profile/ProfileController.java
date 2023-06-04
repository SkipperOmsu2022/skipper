package ru.tinkoff.edu.backend.controllers.profile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;

/**
 * Данный контроллер отвечает за:
 *
 * <ul>
 *   <li>Получения данных для страницы профиля пользователя
 * </ul>
 */
@RestController
@Validated
@Tag(
    name = "Profile Controller",
    description = "Получение данных для страницы профиля пользователя.")
@RequestMapping(value = "/api/user/profile")
@CrossOrigin
public interface ProfileController {
  @Operation(summary = "Получение информации для страницы обычного пользователя.")
  @GetMapping("/{id}")
  ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long id);

  @Operation(
      summary = "Получение информации для страницы ментора.",
      description =
          "Возвращает 4 последних отзыва. mentorId - id пользователя, чью страницу нужно открыть."
              + "(Необязательно) userId - id пользователя, который хочет посмотреть страницу страницу ментора ("
              + "нужно, чтобы отобразить, является ли mentorId избранным для userId)")
  @GetMapping("/mentor/{mentorId}")
  ResponseEntity<UserMentorProfileDTO> getMentorProfile(
      @PathVariable Long mentorId, @RequestParam(required = false) Long userId);
}
