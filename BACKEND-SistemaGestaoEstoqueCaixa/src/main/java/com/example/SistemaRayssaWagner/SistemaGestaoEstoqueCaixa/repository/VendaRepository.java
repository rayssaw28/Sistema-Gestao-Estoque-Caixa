package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {

    @Query("SELECT v FROM Venda v WHERE " +
            "(:usuarioId IS NULL OR v.usuario.id = :usuarioId) AND " +
            "(:inicio IS NULL OR v.dataHora >= :inicio) AND " +
            "(:fim IS NULL OR v.dataHora <= :fim) AND " +
            "(:valorMin IS NULL OR v.valorTotal >= :valorMin) AND " +
            "(:valorMax IS NULL OR v.valorTotal <= :valorMax) " +
            "ORDER BY v.dataHora DESC")
    List<Venda> findByFilters(
            @Param("usuarioId") Long usuarioId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim,
            @Param("valorMin") BigDecimal valorMin,
            @Param("valorMax") BigDecimal valorMax
    );
    List<Venda> findByDataHoraBetweenOrderByDataHoraDesc(LocalDateTime inicio, LocalDateTime fim);
    List<Venda> findByUsuarioIdOrderByDataHoraDesc(Long usuarioId);
    List<Venda> findByUsuarioIdAndDataHoraBetweenOrderByDataHoraDesc(
            Long usuarioId, LocalDateTime inicio, LocalDateTime fim
    );
    List<Venda> findAllByOrderByDataHoraDesc();
}