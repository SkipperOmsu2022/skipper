package ru.tinkoff.edu.backend.handlers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class ErrorHandlingControllerAdvice {
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> onConstraintValidationException(ConstraintViolationException e) {
        return ResponseEntity
                .badRequest()
                .contentType(MediaType.TEXT_PLAIN)
                .body(e.getLocalizedMessage() + "!");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return ResponseEntity
                .badRequest()
                .contentType(MediaType.TEXT_PLAIN)
                .body(e.getLocalizedMessage() + "!");
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<String> onHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return ResponseEntity
                .badRequest()
                .contentType(MediaType.TEXT_PLAIN)
                .body(e.getLocalizedMessage() + "!");
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> onEntityNotFoundException(EntityNotFoundException e) {
        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<String> onEntityExistsException(EntityExistsException e) {
        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }

    @ExceptionHandler(value = {DifferentPasswordException.class, IncorrectCurrentPasswordException.class,
            OldPasswordRepeatNewPasswordException.class})
    public ResponseEntity<String> onChangeAccountDetails(RuntimeException e) {
        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }
}
