package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.ItemVendaResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.ItemVenda;

public final class ItemVendaMapper {

    private ItemVendaMapper() {}

    public static ItemVendaResponse toResponse(ItemVenda iv) {
        return new ItemVendaResponse(
                iv.getProduto().getNome(),
                iv.getQuantidade(),
                iv.getPrecoUnitario(),
                iv.getSubtotal()
        );
    }
}
