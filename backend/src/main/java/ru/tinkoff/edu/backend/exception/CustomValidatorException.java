package ru.tinkoff.edu.backend.exception;

public class CustomValidatorException extends RuntimeException {
    public CustomValidatorException() {
    }

    public CustomValidatorException(String message) {
        super(message);
    }
}
