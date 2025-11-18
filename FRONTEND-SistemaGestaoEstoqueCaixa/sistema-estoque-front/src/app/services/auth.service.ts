import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { UsuarioResponse } from '../models/usuarioResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly AUTH_USER_KEY = 'auth_user';
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioResponse | null>(this.getUsuarioLogado());
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, senha: string): Observable<UsuarioResponse> {
   
    const token = 'Basic ' + btoa(`${email}:${senha}`);

    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<UsuarioResponse>(`${this.baseUrl}/me`, { headers }).pipe(
      tap(usuario => {
       
        sessionStorage.setItem(this.AUTH_TOKEN_KEY, token);
        sessionStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(usuario));
        this.usuarioLogadoSubject.next(usuario);
      })
    );
  }

  logout() {
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
    sessionStorage.removeItem(this.AUTH_USER_KEY);
    this.usuarioLogadoSubject.next(null); 
    this.router.navigate(['/login']); 
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.AUTH_TOKEN_KEY);
  }
  getUsuarioLogado(): UsuarioResponse | null {
    const userJson = sessionStorage.getItem(this.AUTH_USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
  isLoggedIn(): boolean {
    return !!this.getAuthToken() && !!this.getUsuarioLogado();
  }
  isAdmin(): boolean {
    const usuario = this.getUsuarioLogado();
    return !!usuario && usuario.perfil === 'ADMIN';
  }
}