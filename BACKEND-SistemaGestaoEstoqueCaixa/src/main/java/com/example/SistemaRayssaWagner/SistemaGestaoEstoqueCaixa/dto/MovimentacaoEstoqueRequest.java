package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.enums.TipoMovimentacao;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MovimentacaoEstoqueRequest(
        @NotNull(message = "Produto é obrigatório")
        Long produtoId,

        @NotNull(message = "Tipo de movimentação é obrigatório")
        TipoMovimentacao tipo,

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser maior que zero")
        Integer quantidade,

        @NotBlank(message = "Motivo é obrigatório")
        String motivo

) {

}
