import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Posicao } from '../common/posicao';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosicoesService {
  
  private baseUrl = 'http://localhost:8080/posicoes';

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Posicao[]> {
    return this.httpClient.get<Posicao[]>(this.baseUrl);      
  }

  public getPlacas(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.baseUrl + '/placas');
  }

  public posicaoByPlacaData(placa: string, data: Date): Observable<Posicao[]> {
    let params = new HttpParams();
    if (placa !== undefined) {
      params = params.set('placa', placa);
    }
    if (data !== undefined) {
      params = params.set('dataIni', data.getMonth()+1 + "/" + data.getDate() + "/" + data.getFullYear());
      params = params.set('dataFin', data.getMonth()+1 + "/" + data.getDate() + "/" + data.getFullYear());
    }

    return this.httpClient.get<Posicao[]>(this.baseUrl + '/posicao-por-placa-data', { params });
  }  
}
