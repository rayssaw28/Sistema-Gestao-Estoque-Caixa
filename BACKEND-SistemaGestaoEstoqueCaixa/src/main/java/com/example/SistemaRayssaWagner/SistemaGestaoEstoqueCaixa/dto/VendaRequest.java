package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record VendaRequest(
        @NotNull(message = "Itens são obrigatórios")
        List<ItemVendaRequest> itens,

        @NotNull(message = "Valor recebido é obrigatório")
        @DecimalMin(value = "0.01", message = "Valor recebido deve ser maior que zero")
        BigDecimal valorRecebido
) {}
