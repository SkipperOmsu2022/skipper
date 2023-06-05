package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public interface FavoriteUserService {
  void addFavoriteMentor(@NotNull Long userId, @NotNull Long favoriteUserId);

  void deleteFavoriteMentor(@NotNull Long userId, @NotNull Long favoriteUserId);
}
