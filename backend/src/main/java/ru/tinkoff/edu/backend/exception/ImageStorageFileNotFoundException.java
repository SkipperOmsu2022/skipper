package ru.tinkoff.edu.backend.exception;

public class ImageStorageFileNotFoundException extends RuntimeException {
    public ImageStorageFileNotFoundException() {
    }

    public ImageStorageFileNotFoundException(String message) {
        super(message);
    }

    public ImageStorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
