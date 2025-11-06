package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.MovimentacaoEstoqueRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.MovimentacaoEstoqueResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.MovimentacaoEstoque;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Produto;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Usuario;

public final class MovimentacaoEstoqueMapper {

    private MovimentacaoEstoqueMapper() {}

    public static MovimentacaoEstoque toEntity(MovimentacaoEstoqueRequest req, Produto produto, Usuario usuario) {
        MovimentacaoEstoque m = new MovimentacaoEstoque();
        m.setProduto(produto);
        m.setTipo(req.tipo());
        m.setQuantidade(req.quantidade());
        m.setMotivo(req.motivo());
        m.setUsuario(usuario);
        return m;
    }

    public static MovimentacaoEstoqueResponse toResponse(MovimentacaoEstoque m) {
        return new MovimentacaoEstoqueResponse(
                m.getId(),
                m.getProduto() != null ? m.getProduto().getNome() : null,
                m.getTipo() != null ? m.getTipo().name() : null,
                m.getQuantidade(),
                m.getDataHora(),
                m.getUsuario() != null ? m.getUsuario().getNomeCompleto() : null
        );
    }
}