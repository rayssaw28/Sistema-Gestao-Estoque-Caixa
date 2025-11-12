import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../models/usuarioResponse';
import { UsuarioRequest } from '../models/usuarioRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  // GET /api/usuarios
  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.baseUrl);
  }

  // GET /api/usuarios/{id}
  buscarPorId(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/${id}`);
  }

  // POST /api/usuarios
  cadastrar(req: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.baseUrl, req);
  }

  // PUT /api/usuarios/{id}
  atualizar(id: number, req: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/${id}`, req);
  }
  
  // PATCH /api/usuarios/{id}/status
  alternarStatus(id: number): Observable<UsuarioResponse> {
    return this.http.patch<UsuarioResponse>(`${this.baseUrl}/${id}/status`, {});
  }

  // DELETE /api/usuarios/{id}
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

