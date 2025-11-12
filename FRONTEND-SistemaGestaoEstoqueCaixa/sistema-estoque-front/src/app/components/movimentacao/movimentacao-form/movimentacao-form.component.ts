import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { MovimentacaoEstoqueService } from '../../../services/movimentacao-estoque.service';
import { ProdutoService } from '../../../services/produto.service';

import { MovimentacaoEstoqueRequest } from '../../../models/movimentacaoEstoqueRequest';
import { TipoMovimentacao } from '../../../models/tipoMovimentacao';
import { ProdutoResponse } from '../../../models/produtoResponse';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-movimentacao-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    SelectButtonModule
  ],
  providers: [MessageService],
  templateUrl: './movimentacao-form.component.html',
  styleUrls: ['./movimentacao-form.component.css']
})
export class MovimentacaoFormComponent implements OnInit {

  carregando = false;
  produtos: ProdutoResponse[] = []; 
  opcoesTipo = [
    { label: 'Entrada', value: TipoMovimentacao.ENTRADA },
    { label: 'Ajuste Positivo', value: TipoMovimentacao.AJUSTE_POSITIVO },
    { label: 'Ajuste Negativo', value: TipoMovimentacao.AJUSTE_NEGATIVO }
  ];

  movimentacao: MovimentacaoEstoqueRequest = {
    produtoId: 0,
    tipo: TipoMovimentacao.ENTRADA,
    quantidade: 1,
    motivo: ''
  };

  constructor(
    private movService: MovimentacaoEstoqueService,
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
        this.produtos = lista;
        this.carregando = false;
        if (lista.length > 0) {
          this.movimentacao.produtoId = lista[0].id;
        }
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar produtos' });
        this.carregando = false;
      }
    });
  }

  salvar() {
    if (!this.validarCampos()) return;

    this.carregando = true;
    this.movService.registrar(this.movimentacao).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Movimentação registrada' });
        this.carregando = false;
        this.router.navigate(['/movimentacoes']);
      },
      error: (err) => {
        this.carregando = false;
        const status = err?.status;
        if (status === 400 || status === 409) {
          this.msg.add({ severity: 'warn', summary: 'Aviso', detail: err?.error?.message || 'Violação de regra de negócio' });
        } else {
          this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar' });
        }
      }
    });
  }

  private validarCampos(): boolean {
    const m = this.movimentacao;
    if (m.produtoId <= 0) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Selecione um produto' });
      return false;
    }
    if (m.quantidade <= 0) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Quantidade deve ser maior que zero' });
      return false;
    }
    if (!m.motivo || m.motivo.trim().length < 5) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Motivo deve ter pelo menos 5 caracteres' });
      return false;
    }
    return true;
  }
}