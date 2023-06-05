package ru.tinkoff.edu.backend.exception;

public class AddingToFavoriteException extends RuntimeException {
  public AddingToFavoriteException() {}

  public AddingToFavoriteException(String message) {
    super(message);
  }
}
