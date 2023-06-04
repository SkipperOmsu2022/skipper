package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.services.FavoriteUserService;

@RestController
@Validated
@Tag(name = "Favorite Mentor Controller", description = "Добавляет и удаляет избранного ментора.")
@RequestMapping(value = "/api")
@CrossOrigin
public class FavoriteUserController {
  private final FavoriteUserService favoriteUserService;

  public FavoriteUserController(FavoriteUserService favoriteUserService) {
    this.favoriteUserService = favoriteUserService;
  }

  @Operation(summary = "Добавление пользователя в избранное.")
  @PostMapping("/user/favorite/{userId}/{favoriteUserId}")
  public ResponseEntity<Void> addFavoriteMentor(
      @PathVariable Long userId, @PathVariable Long favoriteUserId) {
    favoriteUserService.addFavoriteMentor(userId, favoriteUserId);
    return ResponseEntity.ok().build();
  }

  @Operation(summary = "Удаление пользователя из избранного.")
  @DeleteMapping("/user/favorite/{userId}/{favoriteUserId}")
  public ResponseEntity<Void> deleteFavoriteMentor(
      @PathVariable Long userId, @PathVariable Long favoriteUserId) {
    favoriteUserService.deleteFavoriteMentor(userId, favoriteUserId);
    return ResponseEntity.ok().build();
  }
}
