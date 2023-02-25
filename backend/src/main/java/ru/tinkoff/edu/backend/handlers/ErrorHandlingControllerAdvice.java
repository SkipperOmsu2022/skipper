package ru.tinkoff.edu.backend.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;
import ru.tinkoff.edu.backend.dto.ApiErrorMessage;

@RestControllerAdvice
public class ErrorHandlingControllerAdvice {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiErrorMessage> onRuntimeException(Exception e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiErrorMessage(e.getLocalizedMessage() + "!"));
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ApiErrorMessage> onNoHandlerFoundException(NoHandlerFoundException e) {
        return ResponseEntity
                .badRequest()
                .body(new ApiErrorMessage(e.getLocalizedMessage() + "!"));
    }
}
