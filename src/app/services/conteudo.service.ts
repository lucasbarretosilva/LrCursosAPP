import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conteudo } from '../models/conteudo.model';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ConteudoService {
  url = 'https://localhost:7163/api/conteudos';

  constructor(private http: HttpClient) {}

  obterConteudosPorCurso(cursoId: number): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(`${this.url}/curso/${cursoId}`);
  }

  salvar(conteudo: Conteudo): Observable<any> {
    return this.http.post<Conteudo>(this.url, conteudo, httpOptions);
  } 

  atualizar(conteudo: Conteudo): Observable<any> {
    return this.http.put<Conteudo>(`${this.url}/${conteudo.conteudoId}`, conteudo, httpOptions);
  } 

  deletar(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
