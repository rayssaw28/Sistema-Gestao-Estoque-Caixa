package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.service;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.MovimentacaoEstoqueRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.MovimentacaoEstoqueResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.ResourceNotFoundException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper.MovimentacaoEstoqueMapper;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.MovimentacaoEstoqueRepository;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.ProdutoRepository;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimentacaoEstoqueService {

    private final MovimentacaoEstoqueRepository movimentacaoRepository;
    private final ProdutoRepository produtoRepository;
    private final ProdutoService produtoService;
    private final UsuarioRepository usuarioRepository;

    public MovimentacaoEstoqueService(
            MovimentacaoEstoqueRepository movimentacaoRepository,
            ProdutoRepository produtoRepository,
            ProdutoService produtoService,
            UsuarioRepository usuarioRepository
    ) {
        this.movimentacaoRepository = movimentacaoRepository;
        this.produtoRepository = produtoRepository;
        this.produtoService = produtoService;
        this.usuarioRepository = usuarioRepository;
    }

    public List<MovimentacaoEstoqueResponse> listar() {
        return movimentacaoRepository.findAllByOrderByDataHoraDesc()
                .stream()
                .map(MovimentacaoEstoqueMapper::toResponse)
                .toList();
    }

    @Transactional
    public MovimentacaoEstoqueResponse registrar(MovimentacaoEstoqueRequest req, Long usuarioId) {

        var produto = produtoRepository.findById(req.produtoId())
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        var usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        int delta = switch (req.tipo()) {
            case ENTRADA -> req.quantidade();
            case AJUSTE_POSITIVO -> req.quantidade();
            case AJUSTE_NEGATIVO -> -req.quantidade();
        };

        produtoService.alterarEstoque(produto.getId(), delta);

        var movimento = MovimentacaoEstoqueMapper.toEntity(req, produto, usuario);
        var salvo = movimentacaoRepository.save(movimento);

        return MovimentacaoEstoqueMapper.toResponse(salvo);
    }
}