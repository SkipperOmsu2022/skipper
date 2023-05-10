package ru.tinkoff.edu.backend.exception;

public class AddingFeedbackException extends RuntimeException {
    public AddingFeedbackException() {
    }

    public AddingFeedbackException(String message) {
        super(message);
    }
}
