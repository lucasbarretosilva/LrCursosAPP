import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticacao } from '../models/autenticacao.model';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  url = 'https://localhost:7163/api/Autenticacao';

  constructor(private http: HttpClient) {}

  obterTodosUsuarios():Observable<Autenticacao[]>{
    return this.http.get<Autenticacao[]>(this.url);
  }

  salvarLogin(autenticacao: Autenticacao): Observable<any> {
    return this.http.post<Autenticacao>(this.url, autenticacao, httpOptions);
  } 
  
  atualizarStatus(c: Autenticacao): Observable<any> {
    return this.http.put<Autenticacao>(`${this.url}/${c.id}`, c, httpOptions);
  } 

  obterUsuarioPorEmailSenha(email: string, senha: string): Observable<Autenticacao> {
    return this.http.get<Autenticacao>(`${this.url}/${email}/${senha}`);
  }

}
