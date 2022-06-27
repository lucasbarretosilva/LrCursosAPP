import { CursosService } from '../../../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Autenticacao } from 'src/app/models/autenticacao.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-curso',
  templateUrl: './lista-curso.component.html',
  styleUrls: ['./lista-curso.component.css']
})
export class ListaCursoComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    size: 'md',
    centered:true
  };

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  isManager: boolean = false;
  
  cursos: Curso[] = [];
  public senhaDigitada: any;
  public emailDigitado: any;
  cursosFiltrados: any = [];

  private _filtroLista: string = '';
     
  constructor(private cursoService: CursosService, 
    private modalService: NgbModal, 
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    if(this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
    } 
    if(this.usuarioAutenticado?.isManager == true){
      this.isManager = true;
    }
    this.obterTodos();
  }

   public get filtroLista(){
     return this._filtroLista
   }

   public set filtroLista(value: string){
    this._filtroLista = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista) : this.cursos;
  }

  filtrarCursos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.cursos.filter(
      (cursos: {cursoNome:string;descricao:string}) => cursos.cursoNome.toLocaleLowerCase().indexOf(filtrarPor)!== -1 ||
      cursos.descricao.toLocaleLowerCase().indexOf(filtrarPor)!== -1
     );
  }

  obterTodos(): void{
    this.cursoService.obterTodos().subscribe(
      (resposta)=>{
        this.cursos = resposta;
        
        this.cursosFiltrados= this.cursos;
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  deletar(id:number):void{
    this.cursoService.deletar(id).subscribe(
      ()=>{
        this.toastr.success('', 'Registro Deletado!');
        this.obterTodos();
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  abrirModal(htmlModal:any,id:number) {
    this.modalService.open(htmlModal,this.modalOptions).result.then(
      (resposta) => {
        if(resposta){
          this.deletar(id);
        }
      }
    )
  }

  getUsuario(){
    const usuario = window.sessionStorage.getItem("usuario");
    if(usuario != null){
      return JSON.parse(usuario)
    }
    return null;
  };
}
