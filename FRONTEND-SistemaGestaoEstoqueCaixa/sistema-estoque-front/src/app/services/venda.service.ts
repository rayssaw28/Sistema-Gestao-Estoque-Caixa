import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { VendaResponse } from '../models/vendaResponse';
import { VendaRequest } from '../models/vendaRequest';
import { AuthService } from './auth.service'; // 1. IMPORTE O AUTHSERVICE

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private readonly baseUrl = `${environment.apiUrl}/vendas`;

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) { }

  listar(): Observable<VendaResponse[]> {
    return this.http.get<VendaResponse[]>(this.baseUrl);
  }
  registrar(req: VendaRequest): Observable<VendaResponse> {
    const usuarioLogado = this.authService.getUsuarioLogado();
    const usuarioId = usuarioLogado ? usuarioLogado.id.toString() : '0';

    const params = new HttpParams().set('usuarioId', usuarioId); 
    
    return this.http.post<VendaResponse>(this.baseUrl, req, { params: params });
  }
}