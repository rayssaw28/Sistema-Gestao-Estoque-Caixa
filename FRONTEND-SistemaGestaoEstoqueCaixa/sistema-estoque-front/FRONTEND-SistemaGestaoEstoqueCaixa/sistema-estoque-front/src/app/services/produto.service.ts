import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ProdutoResponse } from '../models/produtoResponse';
import { ProdutoRequest } from '../models/produtoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly baseUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) { }

  // GET /api/produtos
  listar(): Observable<ProdutoResponse[]> {
    return this.http.get<ProdutoResponse[]>(this.baseUrl);
  }

  // GET /api/produtos/{id}
  buscarPorId(id: number): Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(`${this.baseUrl}/${id}`);
  }

  // POST /api/produtos
  cadastrar(req: ProdutoRequest): Observable<ProdutoResponse> {
    return this.http.post<ProdutoResponse>(this.baseUrl, req);
  }

  // PUT /api/produtos/{id}
  atualizar(id: number, req: ProdutoRequest): Observable<ProdutoResponse> {
    return this.http.put<ProdutoResponse>(`${this.baseUrl}/${id}`, req);
  }

  // DELETE /api/produtos/{id}
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}