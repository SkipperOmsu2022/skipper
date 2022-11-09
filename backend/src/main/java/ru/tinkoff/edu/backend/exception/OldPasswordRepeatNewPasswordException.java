package ru.tinkoff.edu.backend.exception;

public class OldPasswordRepeatNewPasswordException extends Exception {
    public OldPasswordRepeatNewPasswordException(String message) {
        super(message);
    }
}
