import { Routes } from '@angular/router';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { MovimentacaoListComponent } from './components/movimentacao/movimentacao-list/movimentacao-list.component';
import { MovimentacaoFormComponent } from './components/movimentacao/movimentacao-form/movimentacao-form.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import { VendaFormComponent } from './components/venda/venda-form/venda-form.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'produtos', 
    component: ProdutoListComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'produtos/novo', 
    component: ProdutoFormComponent, 
    canActivate: [authGuard, adminGuard]
  },
  { 
    path: 'produtos/:id', 
    component: ProdutoFormComponent, 
    canActivate: [authGuard, adminGuard]
  },
  
  { 
    path: 'usuarios', 
    component: UsuarioListComponent, 
    canActivate: [authGuard, adminGuard] 
  },
  { 
    path: 'usuarios/novo', 
    component: UsuarioFormComponent, 
    canActivate: [authGuard, adminGuard] 
  },
  { 
    path: 'usuarios/:id', 
    component: UsuarioFormComponent, 
    canActivate: [authGuard, adminGuard] 
  },

  { 
    path: 'movimentacoes', 
    component: MovimentacaoListComponent, 
    canActivate: [authGuard, adminGuard] 
  },
  { 
    path: 'movimentacoes/novo', 
    component: MovimentacaoFormComponent, 
    canActivate: [authGuard, adminGuard] 
  },

  { 
    path: 'vendas', 
    component: VendaListComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'vendas/novo', 
    component: VendaFormComponent, 
    canActivate: [authGuard] 
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];