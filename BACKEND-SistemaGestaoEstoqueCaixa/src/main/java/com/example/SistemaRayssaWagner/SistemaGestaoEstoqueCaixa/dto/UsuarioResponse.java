package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.enums.PerfilUsuario;

public record UsuarioResponse(
        Long id,
        String nomeCompleto,
        String email,
        PerfilUsuario perfil,
        Boolean ativo
) {

}
