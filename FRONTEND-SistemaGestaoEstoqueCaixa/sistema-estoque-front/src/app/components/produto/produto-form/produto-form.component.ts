import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoRequest } from '../../../models/produtoRequest';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent {

  id: number | null = null;
  isEdicao = false;
  carregando = false;
  produto: ProdutoRequest = {
    codigo: '',
    nome: '',
    categoria: '',
    quantidadeEstoque: 0,
    precoUnitario: 0
  };

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private msg: MessageService
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdicao = true;
      this.id = Number(paramId);
      this.carregarProduto(this.id);
    }
  }

  private carregarProduto(id: number) {
    this.carregando = true;
    this.service.buscarPorId(id).subscribe({
      next: (p) => {
        this.produto = {
          codigo: p.codigo,
          nome: p.nome,
          categoria: p.categoria,
          quantidadeEstoque: p.quantidadeEstoque,
          precoUnitario: p.precoUnitario
        };
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Produto não encontrado' });
        this.carregando = false;
        this.router.navigate(['/produtos']);
      }
    });
  }

  salvar() {
    if (!this.validarCampos()) return;

    this.carregando = true;
    if (this.isEdicao && this.id) {
      this.service.atualizar(this.id, this.produto).subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado' });
          this.carregando = false;
          this.router.navigate(['/produtos']);
        },
        error: (err) => this.tratarErroHttp(err)
      });
    } else {
      this.service.cadastrar(this.produto).subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto cadastrado' });
          this.carregando = false;
          this.router.navigate(['/produtos']);
        },
        error: (err) => this.tratarErroHttp(err)
      });
    }
  }

  limpar() {
    this.produto = {
      codigo: '',
      nome: '',
      categoria: '',
      quantidadeEstoque: 0,
      precoUnitario: 0
    };
  }
  private validarCampos(): boolean {
    const p = this.produto;
    if (!p.codigo || p.codigo.trim().length < 3) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Código deve ter pelo menos 3 caracteres' });
      return false;
    }
    if (!p.nome || p.nome.trim().length < 3) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Nome deve ter pelo menos 3 caracteres' });
      return false;
    }
    if (p.precoUnitario <= 0) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Preço deve ser maior que zero' });
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