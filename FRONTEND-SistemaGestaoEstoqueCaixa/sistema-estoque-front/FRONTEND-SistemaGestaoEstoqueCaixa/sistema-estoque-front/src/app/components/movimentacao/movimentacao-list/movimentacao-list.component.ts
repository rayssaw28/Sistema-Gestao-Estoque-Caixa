import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MovimentacaoEstoqueService } from '../../../services/movimentacao-estoque.service';
import { MovimentacaoEstoqueResponse } from '../../../models/movimentacaoEstoqueResponse';

// Imports do PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // <-- 1. IMPORTAÇÃO ADICIONADA
import { MessageService, ConfirmationService } from 'primeng/api'; // <-- 2. ConfirmationService ADICIONADO

@Component({
  selector: 'app-movimentacao-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule // <-- 3. ADICIONADO AQUI
  ],
  providers: [MessageService, ConfirmationService], // <-- 4. ADICIONADO AQUI
  templateUrl: './movimentacao-list.component.html',
  styleUrls: ['./movimentacao-list.component.css']
})
export class MovimentacaoListComponent implements OnInit {

  movimentacoes: MovimentacaoEstoqueResponse[] = [];
  carregando = false;

  constructor(
    private service: MovimentacaoEstoqueService,
    private msg: MessageService,
    private confirm: ConfirmationService // <-- 5. INJETADO AQUI
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (lista) => {
        this.movimentacoes = lista;
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar movimentações' });
        this.carregando = false;
      }
    });
  }
  
  getSeverity(tipo: string): 'success' | 'info' | 'danger' | undefined {
    switch (tipo) {
      case 'ENTRADA':
        return 'success';
      case 'AJUSTE_POSITIVO':
        return 'info';
      case 'AJUSTE_NEGATIVO':
        return 'danger';
      default:
        return undefined;
    }
  }
}