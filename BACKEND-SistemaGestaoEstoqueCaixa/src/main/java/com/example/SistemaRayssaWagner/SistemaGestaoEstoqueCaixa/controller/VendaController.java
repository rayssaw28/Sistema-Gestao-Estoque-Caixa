package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.controller;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.VendaRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.VendaResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendaController {

    private final VendaService service;

    public VendaController(VendaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<VendaResponse> registrarVenda(
            @RequestParam Long usuarioId,
            @Valid @RequestBody VendaRequest request
    ) {
        var venda = service.registrar(usuarioId, request);
        return ResponseEntity.ok(venda);
    }

    @GetMapping
    public ResponseEntity<List<VendaResponse>> consultar(
            @RequestParam(required = false) Long usuarioId,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim,

            @RequestParam(required = false) BigDecimal valorMin,
            @RequestParam(required = false) BigDecimal valorMax
    ) {
        var lista = service.consultar(inicio, fim, usuarioId, valorMin, valorMax);
        return ResponseEntity.ok(lista);
    }

}
