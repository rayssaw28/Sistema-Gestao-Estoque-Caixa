package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions;

import java.time.OffsetDateTime;

public record ApiError(
        int status,
        String error,
        String message,
        String path,
        OffsetDateTime timestamp
) {}
