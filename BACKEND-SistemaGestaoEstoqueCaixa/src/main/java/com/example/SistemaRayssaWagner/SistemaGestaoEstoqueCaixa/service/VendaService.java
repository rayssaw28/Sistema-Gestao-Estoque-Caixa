package com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.service;

import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.ItemVendaRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.VendaRequest;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.dto.VendaResponse;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.ItemVenda;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Produto;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.entity.Venda;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.BusinessException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.exceptions.ResourceNotFoundException;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.mapper.VendaMapper;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.ProdutoRepository;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.UsuarioRepository;
import com.example.SistemaRayssaWagner.SistemaGestaoEstoqueCaixa.repository.VendaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ProdutoRepository produtoRepository;
    private final ProdutoService produtoService;
    private final UsuarioRepository usuarioRepository;

    public VendaService(VendaRepository vendaRepository,
                        ProdutoRepository produtoRepository,
                        ProdutoService produtoService,
                        UsuarioRepository usuarioRepository) {
                            this.vendaRepository = vendaRepository;
                            this.produtoRepository = produtoRepository;
                            this.produtoService = produtoService;
                            this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public List<VendaResponse> consultar(
            LocalDateTime inicio,
            LocalDateTime fim,
            Long usuarioId,
            BigDecimal valorMin, // Novo parâmetro
            BigDecimal valorMax  // Novo parâmetro
    ) {

        List<Venda> vendas = vendaRepository.findByFilters(
                usuarioId, inicio, fim, valorMin, valorMax
        );

        return vendas.stream()
                .map(VendaMapper::toResponse)
                .toList();
    }

    @Transactional
    public VendaResponse registrar(Long usuarioId, VendaRequest req) {

        // 4. Buscar o usuário
        var usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        List<ItemVenda> itens = new ArrayList<>();
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (ItemVendaRequest itemReq : req.itens()) {
            Produto produto = produtoRepository.findById(itemReq.produtoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
            if (produto.getQuantidadeEstoque() < itemReq.quantidade()) {
                throw new BusinessException("Estoque insuficiente para o produto: " + produto.getNome());
            }
            BigDecimal subtotal = produto.getPrecoUnitario().multiply(BigDecimal.valueOf(itemReq.quantidade()));
            valorTotal = valorTotal.add(subtotal);
            ItemVenda item = new ItemVenda();
            item.setProduto(produto);
            item.setQuantidade(itemReq.quantidade());
            item.setPrecoUnitario(produto.getPrecoUnitario());
            item.setSubtotal(subtotal);
            itens.add(item);
        }

        if (req.valorRecebido().compareTo(valorTotal) < 0) {
            throw new BusinessException("Pagamento insuficiente.");
        }

        BigDecimal troco = req.valorRecebido().subtract(valorTotal);

        Venda venda = new Venda();
        venda.setValorTotal(valorTotal);
        venda.setValorRecebido(req.valorRecebido());
        venda.setTroco(troco);
        venda.setItens(itens);
        venda.setUsuario(usuario);

        itens.forEach(i -> i.setVenda(venda));
        itens.forEach(i -> produtoService.alterarEstoque(i.getProduto().getId(), -i.getQuantidade()));

        Venda salva = vendaRepository.save(venda);

        return VendaMapper.toResponse(salva);
    }
}