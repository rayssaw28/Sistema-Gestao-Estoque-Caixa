import { Routes } from '@angular/router';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { MovimentacaoListComponent } from './components/movimentacao/movimentacao-list/movimentacao-list.component';
import { MovimentacaoFormComponent } from './components/movimentacao/movimentacao-form/movimentacao-form.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { LoginComponent } from './components/login/login.component'; // 1. Importe

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // 2. Adicione

  { path: 'produtos', component: ProdutoListComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/:id', component: ProdutoFormComponent },
  
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/novo', component: UsuarioFormComponent },
  { path: 'usuarios/:id', component: UsuarioFormComponent },

  { path: 'movimentacoes', component: MovimentacaoListComponent },
  { path: 'movimentacoes/novo', component: MovimentacaoFormComponent },

  { path: 'vendas', component: VendaListComponent },
  { path: 'vendas/novo', component: VendaFormComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];