package ru.tinkoff.edu.backend.exception;

public class FileStorageServiceException extends RuntimeException {
  public FileStorageServiceException() {}

  public FileStorageServiceException(String message) {
    super(message);
  }

  public FileStorageServiceException(String message, Throwable cause) {
    super(message, cause);
  }
}
