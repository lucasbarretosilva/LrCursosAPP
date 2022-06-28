import { ConteudoVisto } from './../models/conteudoVisto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ConteudoVistoService {
  url = 'https://localhost:7163/api/ConteudosVistos';

  constructor(private http: HttpClient) { }

  obterConteudosVistosPorUsuario(autenticacaoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/usuario/${autenticacaoId}`);
  }

  salvar(conteudoVisto: ConteudoVisto): Observable<any>{
    return this.http.post<ConteudoVisto>(this.url,conteudoVisto, httpOptions)
  };
}
