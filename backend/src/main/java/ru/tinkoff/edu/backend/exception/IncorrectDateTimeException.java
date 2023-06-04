package ru.tinkoff.edu.backend.exception;

public class IncorrectDateTimeException extends RuntimeException {
  public IncorrectDateTimeException() {}

  public IncorrectDateTimeException(String message) {
    super(message);
  }
}
