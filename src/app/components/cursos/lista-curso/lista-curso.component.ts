import { CursosService } from '../../../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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

  cursos: Curso[] = [];

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

  
  constructor(private cursoService: CursosService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obterTodos();
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

}
