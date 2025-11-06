package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import java.time.LocalDateTime;

public record MovimentacaoEstoqueResponse(
        Long id,
        String produtoNome,
        String tipo,
        Integer quantidade,
        LocalDateTime dataHora,
        String usuarioNome
) {}
