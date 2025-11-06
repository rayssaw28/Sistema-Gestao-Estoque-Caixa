package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.enums.PerfilUsuario;
import jakarta.validation.constraints.*;

public record UsuarioRequest(
        @NotBlank(message = "Nome é obrigatório")
        String nomeCompleto,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 8, message = "Senha deve ter no mínimo 8 caracteres")
        @Pattern(regexp = "^(?=.*[A-Z])(?=.*[0-9]).*$", message = "Senha deve conter ao menos 1 letra maiúscula e 1 número")
        String senha,

        @NotNull(message = "Perfil é obrigatório")
        PerfilUsuario perfil,

        @NotNull(message = "Status é obrigatório")
        Boolean ativo
) {
}
