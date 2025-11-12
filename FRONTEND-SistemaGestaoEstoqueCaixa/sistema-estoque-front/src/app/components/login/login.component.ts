import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    CardModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    senha: ''
  };
  carregando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msg: MessageService
  ) {}

  login() {
    this.carregando = true;
    this.authService.login(this.credentials.email, this.credentials.senha).subscribe({
      next: (usuario) => {
        this.carregando = false;
        this.router.navigate(['/produtos']);
      },
      error: (err) => {
        this.carregando = false;
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Email ou senha inválidos' });
      }
    });
  }
}