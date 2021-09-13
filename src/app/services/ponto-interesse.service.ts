import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PontoInteresse } from '../common/ponto-interesse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PontoInteresseService {

  private baseUrl = 'http://localhost:8080/pontos';

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<PontoInteresse[]> {
    return this.httpClient.get<PontoInteresse[]>(this.baseUrl);      
  }

}
