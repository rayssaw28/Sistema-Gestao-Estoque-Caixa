import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoResponse } from '../../../models/produtoResponse';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  produtos: ProdutoResponse[] = [];
  carregando = false;

  constructor(
    private service: ProdutoService,
    private msg: MessageService,
    private confirm: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (lista) => {
        this.produtos = lista;
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar produtos' });
        this.carregando = false;
      }
    });
  }

  novo(): void {
    this.router.navigate(['/produtos/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/produtos', id]);
  }

 
  confirmarExclusao(p: ProdutoResponse): void {
    this.confirm.confirm({
      message: `Confirma excluir o produto ${p.nome}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.excluir(p.id)
    });
  }

  private excluir(id: number): void {
    this.carregando = true;
    this.service.excluir(id).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto excluído' });
        this.carregar();
      },
      error: (err) => {
        const status = err?.status;
        if (status === 400 || status === 409) {
           this.msg.add({ severity: 'warn', summary: 'Aviso', detail: err?.error?.message || 'Não foi possível excluir' });
        } else {
          this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível excluir' });
        }
        this.carregando = false;
      }
    });
  }
}