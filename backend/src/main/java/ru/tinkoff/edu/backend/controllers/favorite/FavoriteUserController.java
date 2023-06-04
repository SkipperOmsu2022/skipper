package ru.tinkoff.edu.backend.controllers.favorite;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@Tag(name = "Favorite Mentor Controller", description = "Добавляет и удаляет избранного ментора.")
@RequestMapping(value = "/api")
@CrossOrigin
public interface FavoriteUserController {
  @Operation(summary = "Добавление пользователя в избранное.")
  @PostMapping("/user/favorite/{userId}/{favoriteUserId}")
  ResponseEntity<Void> addFavoriteMentor(
      @PathVariable Long userId, @PathVariable Long favoriteUserId);

  @Operation(summary = "Удаление пользователя из избранного.")
  @DeleteMapping("/user/favorite/{userId}/{favoriteUserId}")
  ResponseEntity<Void> deleteFavoriteMentor(
      @PathVariable Long userId, @PathVariable Long favoriteUserId);
}
