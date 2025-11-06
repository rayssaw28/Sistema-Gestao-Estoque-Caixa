package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.VendaResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Venda;

import java.util.stream.Collectors;

public final class VendaMapper {

    private VendaMapper() {}

    public static VendaResponse toResponse(Venda v) {
        return new VendaResponse(
                v.getId(),
                v.getUsuario().getNomeCompleto(),
                v.getValorTotal(),
                v.getValorRecebido(),
                v.getTroco(),
                v.getDataHora(),
                v.getItens().stream().map(ItemVendaMapper::toResponse).collect(Collectors.toList())
        );
    }
}
