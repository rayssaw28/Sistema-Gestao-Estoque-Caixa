package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions;

public class EmailConflictException extends RuntimeException {
    public EmailConflictException(String message) {
        super(message);
    }
}
