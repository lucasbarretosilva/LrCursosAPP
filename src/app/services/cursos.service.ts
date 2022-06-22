
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Curso } from '../models/curso.model';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CursosService {
//
  private url = 'https://localhost:7163/api/Cursos';
  private urlConteudo = 'https://localhost:7163/api/conteudos';
  private urlUsuario = 'https://localhost:7163/api/usuarios';

  constructor(private http: HttpClient) {}

  obterTodos():Observable<Curso[]>{
    return this.http.get<Curso[]>(this.url);
  }

  deletar(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  salvar(c: Curso): Observable<any> {
    return this.http.post<Curso>(this.url, c, httpOptions);
  } 

  atualizar(c: Curso): Observable<any> {
    return this.http.put<Curso>(this.url, c, httpOptions);
  } 


}
