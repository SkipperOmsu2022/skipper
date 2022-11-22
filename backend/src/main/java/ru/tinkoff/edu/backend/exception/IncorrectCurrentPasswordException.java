package ru.tinkoff.edu.backend.exception;

public class IncorrectCurrentPasswordException extends RuntimeException {
    public IncorrectCurrentPasswordException() {
    }

    public IncorrectCurrentPasswordException(String message) {
        super(message);
    }
}
