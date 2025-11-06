package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.service;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.ProdutoRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.ProdutoResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Produto;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.BusinessException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.ResourceNotFoundException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper.ProdutoMapper;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<ProdutoResponse> listar() {
        return repository.findAllByOrderByNomeAsc()
                .stream()
                .map(ProdutoMapper::toResponse)
                .toList();
    }

    public ProdutoResponse buscar(Long id) {
        var produto = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
        return ProdutoMapper.toResponse(produto);
    }

    @Transactional
    public ProdutoResponse cadastrar(ProdutoRequest req) {

        if (repository.existsByCodigoIgnoreCase(req.codigo())) {
            throw new BusinessException("Código já está cadastrado");
        }

        Produto novo = ProdutoMapper.toEntity(req);
        Produto salvo = repository.save(novo);

        return ProdutoMapper.toResponse(salvo);
    }

    @Transactional
    public ProdutoResponse atualizar(Long id, ProdutoRequest req) {
        var existente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        if (!existente.getCodigo().equalsIgnoreCase(req.codigo())) {
            throw new BusinessException("Código do produto não pode ser alterado");
        }

        ProdutoMapper.copyToEntity(req, existente);
        var salvo = repository.save(existente);

        return ProdutoMapper.toResponse(salvo);
    }

    @Transactional
    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado");
        }
        repository.deleteById(id);
    }

    @Transactional
    public void alterarEstoque(Long produtoId, int quantidadeDelta) {
        var produto = repository.findById(produtoId)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        int novoEstoque = produto.getQuantidadeEstoque() + quantidadeDelta;

        if (novoEstoque < 0) {
            throw new BusinessException("Estoque insuficiente");
        }

        produto.setQuantidadeEstoque(novoEstoque);
        repository.save(produto);
    }
}
