package ru.tinkoff.edu.backend.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.tinkoff.edu.backend.dto.ErrorMessage;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class ErrorHandlingControllerAdvice {
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorMessage> onConstraintValidationException(ConstraintViolationException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getLocalizedMessage() + "!"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getMessage() + "!"));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorMessage> onHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getMessage() + "!"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorMessage> onHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getLocalizedMessage() + '!'));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorMessage> onEntityNotFoundException(EntityNotFoundException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ErrorMessage> onEntityExistsException(EntityExistsException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(value = {DifferentPasswordException.class, IncorrectCurrentPasswordException.class,
            OldPasswordRepeatNewPasswordException.class})
    public ResponseEntity<ErrorMessage> onChangeAccountDetails(RuntimeException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getMessage()));
    }
}
