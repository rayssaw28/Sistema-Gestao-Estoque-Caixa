import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MovimentacaoEstoqueResponse } from '../models/movimentacaoEstoqueResponse';
import { MovimentacaoEstoqueRequest } from '../models/movimentacaoEstoqueRequest';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoEstoqueService {

  private readonly baseUrl = `${environment.apiUrl}/movimentacoes-estoque`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  listar(): Observable<MovimentacaoEstoqueResponse[]> {
    return this.http.get<MovimentacaoEstoqueResponse[]>(this.baseUrl);
  }

  registrar(req: MovimentacaoEstoqueRequest): Observable<MovimentacaoEstoqueResponse> {
    const usuarioLogado = this.authService.getUsuarioLogado(); 
    const usuarioId = usuarioLogado ? usuarioLogado.id.toString() : '0';
    const params = new HttpParams().set('usuarioId', usuarioId); 
    
    return this.http.post<MovimentacaoEstoqueResponse>(this.baseUrl, req, { params: params });
  }
}