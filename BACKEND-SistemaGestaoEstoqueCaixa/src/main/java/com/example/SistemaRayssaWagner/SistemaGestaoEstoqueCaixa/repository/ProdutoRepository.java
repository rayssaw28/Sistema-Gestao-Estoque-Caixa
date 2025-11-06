package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Optional<Produto> findByCodigoIgnoreCase(String codigo);
    boolean existsByCodigoIgnoreCase(String codigo);
    List<Produto> findAllByOrderByNomeAsc();
}
