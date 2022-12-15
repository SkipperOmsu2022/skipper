package ru.tinkoff.edu.backend.exception;

public class FileExtensionNotSupportedException extends RuntimeException {
    public FileExtensionNotSupportedException() {
    }

    public FileExtensionNotSupportedException(String message) {
        super(message);
    }

    public FileExtensionNotSupportedException(String message, Throwable cause) {
        super(message, cause);
    }
}
