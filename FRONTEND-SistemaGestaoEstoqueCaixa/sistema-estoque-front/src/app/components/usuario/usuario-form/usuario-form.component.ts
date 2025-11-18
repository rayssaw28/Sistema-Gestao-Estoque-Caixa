import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioRequest } from '../../../models/usuarioRequest';
import { PerfilUsuario } from '../../../models/perfilUsuario';
import { MessageService } from 'primeng/api';

// Imports do PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    ToggleButtonModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  id: number | null = null;
  isEdicao = false;
  carregando = false;

  opcoesPerfil = [
    { label: 'Administrador', value: PerfilUsuario.ADMIN },
    { label: 'Operador', value: PerfilUsuario.OPERADOR }
  ];

  usuario: UsuarioRequest = {
    nomeCompleto: '',
    email: '',
    senha: '',
    perfil: PerfilUsuario.OPERADOR,
    ativo: true
  };

  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdicao = true;
      this.id = Number(paramId);
      this.carregarUsuario(this.id);
    }
  }

  private carregarUsuario(id: number) {
    this.carregando = true;
    this.service.buscarPorId(id).subscribe({
      next: (u) => {
        this.usuario = {
          nomeCompleto: u.nomeCompleto,
          email: u.email,
          perfil: u.perfil,
          ativo: u.ativo,
          senha: ''
        };
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não encontrado' });
        this.carregando = false;
        this.router.navigate(['/usuarios']);
      }
    });
  }

  salvar() {
    if (!this.validarCampos()) return;

    this.carregando = true;

    if (this.isEdicao && (!this.usuario.senha || this.usuario.senha.trim() === '')) {
      delete this.usuario.senha;
    }

    if (this.isEdicao && this.id) {
      this.service.atualizar(this.id, this.usuario).subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado' });
          this.carregando = false;
          this.router.navigate(['/usuarios']);
        },
        error: (err) => this.tratarErroHttp(err)
      });
    } else {
      this.service.cadastrar(this.usuario).subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário cadastrado' });
          this.carregando = false;
          this.router.navigate(['/usuarios']);
        },
        error: (err) => this.tratarErroHttp(err)
      });
    }
  }

  private validarCampos(): boolean {
    const u = this.usuario;
    if (!u.nomeCompleto || u.nomeCompleto.trim().length < 3) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Nome deve ter pelo menos 3 caracteres' });
      return false;
    }
    if (!u.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email)) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'E-mail inválido' });
      return false;
    }
    if (!this.isEdicao && (!u.senha || u.senha.length < 8)) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Senha deve ter no mínimo 8 caracteres' });
      return false;
    }
    // Adicionar validação de senha do backend
    if (!this.isEdicao && u.senha && !/^(?=.*[A-Z])(?=.*[0-9]).*$/.test(u.senha)) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Senha deve conter ao menos 1 letra maiúscula e 1 número' });
      return false;
    }
    return true;
  }

  private tratarErroHttp(err: any) {
    this.carregando = false;
    const status = err?.status;
    if (status === 409 || status === 400) {
      this.msg.add({ severity: 'warn', summary: 'Aviso', detail: err?.error?.message || 'Violação de regra de negócio' });
    } else {
      this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar' });
    }
  }
}