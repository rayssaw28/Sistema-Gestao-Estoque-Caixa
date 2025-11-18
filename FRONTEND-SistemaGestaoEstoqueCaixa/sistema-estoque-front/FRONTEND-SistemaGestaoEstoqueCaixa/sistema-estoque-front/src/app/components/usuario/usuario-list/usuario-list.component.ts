import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioResponse } from '../../../models/usuarioResponse';

// Importações dos módulos do PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario-list',
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
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: UsuarioResponse[] = [];
  carregando = false;

  constructor(
    private service: UsuarioService,
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
        this.usuarios = lista;
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar usuários' });
        this.carregando = false;
      }
    });
  }

  novo(): void {
    this.router.navigate(['/usuarios/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/usuarios', id]);
  }

  confirmarExclusao(u: UsuarioResponse): void {
    this.confirm.confirm({
      message: `Confirma excluir ${u.nomeCompleto}? Esta ação não pode ser desfeita.`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Não',
      accept: () => this.excluir(u.id)
    });
  }

  confirmarAlternarStatus(u: UsuarioResponse): void {
     this.confirm.confirm({
      message: `Confirma alterar o status de ${u.nomeCompleto}?`,
      header: 'Confirmar Alteração',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.alternarStatus(u.id)
    });
  }

  private alternarStatus(id: number): void {
    this.carregando = true;
    this.service.alternarStatus(id).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Status do usuário alterado' });
        this.carregar();
      },
      error: (err) => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: err?.error?.message || 'Não foi possível alterar o status' });
        this.carregando = false;
      }
    });
  }
  
  private excluir(id: number): void {
    this.carregando = true;
    this.service.excluir(id).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário excluído' });
        this.carregar();
      },
      error: (err) => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: err?.error?.message || 'Não foi possível excluir' });
        this.carregando = false;
      }
    });
  }
}