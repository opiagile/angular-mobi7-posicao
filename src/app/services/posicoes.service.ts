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

  public posicaoByPlacaData(placa: string, dataIni: Date, dataFin: Date): Observable<Posicao[]> {
    let params = new HttpParams();

    if (dataIni !== undefined && dataFin !== undefined) {
      params = params.set('dataIni', dataIni.getMonth()+1 + "/" + dataIni.getDate() + "/" + dataIni.getFullYear() + " " + "00:00:00");
      params = params.set('dataFin', dataFin.getMonth()+1 + "/" + dataFin.getDate() + "/" + dataFin.getFullYear() + " " + "23:59:59");
    }
    if (placa !== undefined && placa !== ''){
      params = params.set('placa', placa);
      return this.httpClient.get<Posicao[]>(this.baseUrl + '/posicao-por-placa-data', { params });
    } else {
      return this.httpClient.get<Posicao[]>(this.baseUrl + '/posicao-por-data', { params });
    }    
  }  
}
