import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { VendaResponse } from '../models/vendaResponse';
import { VendaRequest } from '../models/vendaRequest';
import { AuthService } from './auth.service';

export interface VendaFilters {
  inicio?: Date;
  fim?: Date;
  valorMin?: number;
  valorMax?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private readonly baseUrl = `${environment.apiUrl}/vendas`;

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) { }

  listar(filters: VendaFilters = {}): Observable<VendaResponse[]> {
    let params = new HttpParams();

    if (filters.inicio) {
      params = params.set('inicio', filters.inicio.toISOString());
    }
    if (filters.fim) {
      const dataFim = new Date(filters.fim);
      dataFim.setHours(23, 59, 59, 999);
      params = params.set('fim', dataFim.toISOString());
    }
    if (filters.valorMin != null) {
      params = params.set('valorMin', filters.valorMin.toString());
    }
    if (filters.valorMax != null) {
      params = params.set('valorMax', filters.valorMax.toString());
    }
    
    return this.http.get<VendaResponse[]>(this.baseUrl, { params: params });
  }

  registrar(req: VendaRequest): Observable<VendaResponse> {
    const usuarioLogado = this.authService.getUsuarioLogado();
    const usuarioId = usuarioLogado ? usuarioLogado.id.toString() : '0';

    const params = new HttpParams().set('usuarioId', usuarioId); 
    
    return this.http.post<VendaResponse>(this.baseUrl, req, { params: params });
  }
}