import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MovimentacaoEstoqueResponse } from '../models/movimentacaoEstoqueResponse';
import { MovimentacaoEstoqueRequest } from '../models/movimentacaoEstoqueRequest';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoEstoqueService {

  private readonly baseUrl = `${environment.apiUrl}/movimentacoes-estoque`;

  constructor(private http: HttpClient) { }

  // GET /api/movimentacoes-estoque
  listar(): Observable<MovimentacaoEstoqueResponse[]> {
    return this.http.get<MovimentacaoEstoqueResponse[]>(this.baseUrl);
  }

  // POST /api/movimentacoes-estoque
  registrar(req: MovimentacaoEstoqueRequest): Observable<MovimentacaoEstoqueResponse> {
    const params = new HttpParams().set('usuarioId', '1'); 
    
    return this.http.post<MovimentacaoEstoqueResponse>(this.baseUrl, req, { params: params });
  }
}