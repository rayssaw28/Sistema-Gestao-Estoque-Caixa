import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

// Nossos Serviços e Models
import { VendaService } from '../../../services/venda.service';
import { ProdutoService } from '../../../services/produto.service';
import { VendaRequest } from '../../../models/vendaRequest';
import { ItemVendaRequest } from '../../../models/itemVendaRequest';
import { ProdutoResponse } from '../../../models/produtoResponse';

// Imports do PrimeNG
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';

// Interface interna para o Carrinho
interface ItemCarrinho {
  produtoId: number;
  codigo: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  produtos: ProdutoResponse[] = [];
  carrinho: ItemCarrinho[] = [];

  produtoSelecionadoId: number | null = null;
  quantidadeSelecionada: number = 1;
  
  valorTotal: number = 0;
  valorRecebido: number = 0;
  troco: number = 0;
  
  carregando = false;

  constructor(
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  private carregarProdutos() {
    this.carregando = true;
    this.produtoService.listar().subscribe({
      next: (lista) => {
        this.produtos = lista.filter(p => p.quantidadeEstoque > 0);
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar produtos do estoque' });
        this.carregando = false;
      }
    });
  }

  adicionarItem() {
    if (!this.produtoSelecionadoId || this.quantidadeSelecionada <= 0) {
      this.msg.add({ severity: 'warn', summary: 'Aviso', detail: 'Selecione um produto e a quantidade' });
      return;
    }

    const produto = this.produtos.find(p => p.id === this.produtoSelecionadoId);
    if (!produto) {
      this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Produto não encontrado' });
      return;
    }

    if (produto.quantidadeEstoque < this.quantidadeSelecionada) {
      this.msg.add({ severity: 'error', summary: 'Estoque Insuficiente', detail: `Estoque disponível para ${produto.nome}: ${produto.quantidadeEstoque}` });
      return;
    }

    const itemExistente = this.carrinho.find(i => i.produtoId === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += this.quantidadeSelecionada;
      itemExistente.subtotal = itemExistente.quantidade * itemExistente.precoUnitario;
    } else {
      const subtotal = this.quantidadeSelecionada * produto.precoUnitario;
      this.carrinho.push({
        produtoId: produto.id,
        codigo: produto.codigo,
        nome: produto.nome,
        quantidade: this.quantidadeSelecionada,
        precoUnitario: produto.precoUnitario,
        subtotal: subtotal
      });
    }

    produto.quantidadeEstoque -= this.quantidadeSelecionada;
    this.produtoSelecionadoId = null;
    this.quantidadeSelecionada = 1;
    this.recalcularTotal();
  }

  removerItem(produtoId: number) {
    const itemIndex = this.carrinho.findIndex(i => i.produtoId === produtoId);
    if (itemIndex === -1) return;

    const itemRemovido = this.carrinho[itemIndex];

    const produto = this.produtos.find(p => p.id === itemRemovido.produtoId);
    if (produto) {
      produto.quantidadeEstoque += itemRemovido.quantidade;
    }
    
    this.carrinho.splice(itemIndex, 1);
    this.recalcularTotal();
  }

  private recalcularTotal() {
    this.valorTotal = this.carrinho.reduce((total, item) => total + item.subtotal, 0);
    this.recalcularTroco();
  }

  recalcularTroco() {
    if (this.valorRecebido >= this.valorTotal) {
      this.troco = this.valorRecebido - this.valorTotal;
    } else {
      this.troco = 0;
    }
  }

  finalizarVenda() {
    if (this.carrinho.length === 0) {
      this.msg.add({ severity: 'warn', summary: 'Aviso', detail: 'Adicione pelo menos um item ao carrinho' });
      return;
    }

    if (this.valorRecebido < this.valorTotal) {
      this.msg.add({ severity: 'warn', summary: 'Aviso', detail: 'Valor recebido é menor que o valor total' });
      return;
    }

    this.carregando = true;

    const itensRequest: ItemVendaRequest[] = this.carrinho.map(item => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade
    }));

    const vendaRequest: VendaRequest = {
      itens: itensRequest,
      valorRecebido: this.valorRecebido
    };

    this.vendaService.registrar(vendaRequest).subscribe({
      next: (vendaSalva) => {
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: `Venda #${vendaSalva.id} registrada! Troco: ${vendaSalva.troco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` });
        this.carregando = false;
        
        this.carrinho = [];
        this.valorRecebido = 0;
        this.valorTotal = 0;
        this.troco = 0;
        
        this.carregarProdutos(); 
      },
      error: (err) => {
        this.carregando = false;
        this.msg.add({ severity: 'error', summary: 'Erro', detail: err?.error?.message || 'Falha ao registrar venda' });
        
        this.carrinho.forEach(itemCarrinho => {
           const produto = this.produtos.find(p => p.id === itemCarrinho.produtoId);
           if(produto) {
             produto.quantidadeEstoque += itemCarrinho.quantidade;
           }
        });
      }
    });
  }
  getEstoqueProdutoSelecionado(): number {
    if (!this.produtoSelecionadoId) {
      return 0;
    }
    const produto = this.produtos.find(p => p.id === this.produtoSelecionadoId);
    return produto ? produto.quantidadeEstoque : 0;
  }
}