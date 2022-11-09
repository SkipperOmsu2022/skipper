package ru.tinkoff.edu.backend.exception;

public class DifferentPasswordException extends Exception {
    public DifferentPasswordException(String message) {
        super(message);
    }
}
