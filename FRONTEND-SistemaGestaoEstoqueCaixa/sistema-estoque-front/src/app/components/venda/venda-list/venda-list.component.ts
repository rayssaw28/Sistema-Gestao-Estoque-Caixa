import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VendaService } from '../../../services/venda.service';
import { VendaResponse } from '../../../models/vendaResponse';

// Imports do PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {

  vendas: VendaResponse[] = [];
  carregando = false;

  constructor(
    private service: VendaService,
    private msg: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (lista) => {
        this.vendas = lista;
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar vendas' });
        this.carregando = false;
      }
    });
  }

  novaVenda(): void {
    this.router.navigate(['/vendas/novo']);
  }
}