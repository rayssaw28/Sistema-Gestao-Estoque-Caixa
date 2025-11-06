package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.controller;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.UsuarioResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Usuario;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper.UsuarioMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> getMe(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof Usuario)) {
            return ResponseEntity.status(401).build();
        }

        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        UsuarioResponse response = UsuarioMapper.toResponse(usuarioLogado);
        return ResponseEntity.ok(response);
    }
}