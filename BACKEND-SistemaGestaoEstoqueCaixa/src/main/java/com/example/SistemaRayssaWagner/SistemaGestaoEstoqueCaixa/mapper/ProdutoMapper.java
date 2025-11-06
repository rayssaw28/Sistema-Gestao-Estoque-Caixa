package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.ProdutoRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.ProdutoResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Produto;

public final class ProdutoMapper {

    private ProdutoMapper() {}

    public static Produto toEntity(ProdutoRequest req) {
        Produto p = new Produto();
        p.setCodigo(req.codigo());
        p.setNome(req.nome());
        p.setCategoria(req.categoria());
        p.setQuantidadeEstoque(req.quantidadeEstoque());
        p.setPrecoUnitario(req.precoUnitario());
        return p;
    }

    public static void copyToEntity(ProdutoRequest req, Produto p) {
        p.setNome(req.nome());
        p.setCategoria(req.categoria());
        p.setQuantidadeEstoque(req.quantidadeEstoque());
        p.setPrecoUnitario(req.precoUnitario());
    }

    public static ProdutoResponse toResponse(Produto p) {
        return new ProdutoResponse(
                p.getId(),
                p.getCodigo(),
                p.getNome(),
                p.getCategoria(),
                p.getQuantidadeEstoque(),
                p.getPrecoUnitario()
        );
    }
}
