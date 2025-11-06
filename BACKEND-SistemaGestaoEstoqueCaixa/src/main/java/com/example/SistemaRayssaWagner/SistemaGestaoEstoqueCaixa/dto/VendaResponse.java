package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record VendaResponse(
        Long id,
        String usuarioNome,
        BigDecimal valorTotal,
        BigDecimal valorRecebido,
        BigDecimal troco,
        LocalDateTime dataHora,
        List<ItemVendaResponse> itens
) {

}
