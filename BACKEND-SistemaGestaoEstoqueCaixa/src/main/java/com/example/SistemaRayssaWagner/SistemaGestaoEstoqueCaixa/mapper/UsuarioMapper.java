package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.UsuarioRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.UsuarioResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Usuario;

public final class UsuarioMapper {

    private UsuarioMapper() {}

    public static Usuario toEntity(UsuarioRequest req) {
        Usuario u = new Usuario();
        u.setNomeCompleto(req.nomeCompleto());
        u.setEmail(req.email());
        u.setSenha(req.senha());
        u.setPerfil(req.perfil());
        u.setAtivo(req.ativo());
        return u;
    }

    public static void copyToEntity(UsuarioRequest req, Usuario u) {
        u.setNomeCompleto(req.nomeCompleto());
        u.setEmail(req.email());
        u.setSenha(req.senha());
        u.setPerfil(req.perfil());
        u.setAtivo(req.ativo());
    }

    public static UsuarioResponse toResponse(Usuario u) {
        return new UsuarioResponse(
                u.getId(),
                u.getNomeCompleto(),
                u.getEmail(),
                u.getPerfil(),
                u.getAtivo()
        );
    }
}
