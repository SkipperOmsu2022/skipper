package ru.tinkoff.edu.backend.exception;

public class ImageStorageException extends RuntimeException {
  public ImageStorageException() {}

  public ImageStorageException(String message) {
    super(message);
  }

  public ImageStorageException(String message, Throwable cause) {
    super(message, cause);
  }
}
