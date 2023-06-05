package ru.tinkoff.edu.backend.exception;

public class DifferentPasswordException extends RuntimeException {
  public DifferentPasswordException() {}

  public DifferentPasswordException(String message) {
    super(message);
  }
}
