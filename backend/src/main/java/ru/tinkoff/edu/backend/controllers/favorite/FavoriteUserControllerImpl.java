package ru.tinkoff.edu.backend.controllers.favorite;

import org.springframework.http.ResponseEntity;
import ru.tinkoff.edu.backend.services.FavoriteUserService;

public class FavoriteUserControllerImpl implements FavoriteUserController {
  private final FavoriteUserService favoriteUserService;

  public FavoriteUserControllerImpl(FavoriteUserService favoriteUserService) {
    this.favoriteUserService = favoriteUserService;
  }

  @Override
  public ResponseEntity<Void> addFavoriteMentor(Long userId, Long favoriteUserId) {
    favoriteUserService.addFavoriteMentor(userId, favoriteUserId);
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> deleteFavoriteMentor(Long userId, Long favoriteUserId) {
    favoriteUserService.deleteFavoriteMentor(userId, favoriteUserId);
    return ResponseEntity.ok().build();
  }
}
