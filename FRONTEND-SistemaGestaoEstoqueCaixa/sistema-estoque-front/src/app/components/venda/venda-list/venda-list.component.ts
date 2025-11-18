import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VendaService, VendaFilters } from '../../../services/venda.service'; 
import { VendaResponse } from '../../../models/vendaResponse';
import { FormsModule } from '@angular/forms'; 

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar'; 
import { InputNumberModule } from 'primeng/inputnumber'; 

@Component({
  selector: 'app-venda-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule,
    CalendarModule, 
    InputNumberModule 
  ],
  providers: [MessageService],
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {

  vendas: VendaResponse[] = [];
  carregando = false;
  filtros: VendaFilters = {}; 

  constructor(
    private service: VendaService,
    private msg: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pesquisar(); 
  }

  pesquisar(): void {
    this.carregando = true;
    this.service.listar(this.filtros).subscribe({ 
      next: (lista) => {
        this.vendas = lista;
        this.carregando = false;
      },
      error: (err) => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: err?.error?.message || 'Falha ao carregar vendas' });
        this.carregando = false;
      }
    });
  }

  limparFiltros(): void {
    this.filtros = {};
    this.pesquisar();
  }

  novaVenda(): void {
    this.router.navigate(['/vendas/novo']);
  }
}