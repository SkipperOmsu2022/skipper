package ru.tinkoff.edu.backend.exception;

public class OldPasswordRepeatNewPasswordException extends RuntimeException {
    public OldPasswordRepeatNewPasswordException() {
    }

    public OldPasswordRepeatNewPasswordException(String message) {
        super(message);
    }
}
