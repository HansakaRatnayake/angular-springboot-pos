package com.devstack.pos.advisers;

import com.devstack.pos.exception.EntryNotFoundException;
import com.devstack.pos.util.StandardResponseDto;
import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWideExceptionHandler {

    @ExceptionHandler(EntityActionVetoException.class)
    public ResponseEntity<StandardResponseDto> HandleEntryNotFoundException(EntryNotFoundException e){
        return new ResponseEntity<>(
                new StandardResponseDto(404, e.getMessage(), e),
                HttpStatus.NOT_FOUND
        );
    }
}
