package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import java.math.BigDecimal;

public record ItemVendaResponse(
        String produtoNome,
        Integer quantidade,
        BigDecimal precoUnitario,
        BigDecimal subtotal
) {}
