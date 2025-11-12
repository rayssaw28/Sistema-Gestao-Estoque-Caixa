import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Gestão',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Produtos',
            icon: 'pi pi-box',
            routerLink: '/produtos'
          },
          {
            label: 'Movimentações',
            icon: 'pi pi-arrows-h',
            routerLink: '/movimentacoes'
          },
          {
            label: 'Usuários',
            icon: 'pi pi-users',
            routerLink: '/usuarios'
          },
          {
            label: 'Vendas',
            icon: 'pi pi-shopping-cart',
            routerLink: '/vendas'
          },
          {
            label: 'Registrar Venda (PDV)',
            icon: 'pi pi-dollar',
            routerLink: '/vendas/novo'
          }
        ]
      },

      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  logout() {
    this.authService.logout();
  }
}