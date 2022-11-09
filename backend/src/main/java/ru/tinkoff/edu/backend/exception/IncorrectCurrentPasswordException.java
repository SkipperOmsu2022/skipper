package ru.tinkoff.edu.backend.exception;

public class IncorrectCurrentPasswordException extends Exception {
    public IncorrectCurrentPasswordException(String message) {
        super(message);
    }
}
