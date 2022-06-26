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

  usuarioTeste: Autenticacao []=[];
  usuario: any;
  usuarios: Autenticacao[] = [];
  autenticado: boolean = false;
  cursos: Curso[] = [];
  public senhaDigitada: any;
  public emailDigitado: any;
  
  

  cursosFiltrados: any = [];

   private _filtroLista: string = '';

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

  
  constructor(private cursoService: CursosService, private modalService: NgbModal, private toastr: ToastrService,
    private autenticacaoService: AutenticacaoService, private activatedRoute: ActivatedRoute,
    private router: Router,
    
    ) {this.usuario = new FormGroup({
      email: new FormControl(null),
      senha: new FormControl(null),
       
    }); }

  ngOnInit(): void {
    this.obterTodos();
    this.obterTodosUsuarios();
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

  obterTodosUsuarios(): void{
    this.autenticacaoService.obterTodosUsuarios().subscribe(
      (resposta)=>{
        this.usuarios = resposta;
        this.usuarioTeste = this.usuario;
        console.log(this.usuarios)
        
        
       
        
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  usuariosEncontrados = this.usuarios.filter(x=> x.Email == this.usuario.value.email.toString())
  senhasEncontradas = this.usuarios.filter(x=> x.Senha == this.usuario.value.senha)

  teste(){
    console.log(this.usuarios);
    console.log(this.usuario.value.email);
    console.log(this.usuariosEncontrados);
    console.log(this.senhasEncontradas);
   


  }
  
  
  



}
