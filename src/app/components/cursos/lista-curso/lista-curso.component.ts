import { CursosService } from '../../../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
  
  constructor(private cursoService: CursosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obterTodos();
  }

  obterTodos(): void{
    this.cursoService.obterTodos().subscribe(
      (resposta)=>{
        this.cursos = resposta;
      },
      (error)=>{
        //inserir toaster de erro
      }
    )
  }

  deletar(id:number):void{
    this.cursoService.deletar(id).subscribe(
      ()=>{
        //inserir toaster
        this.obterTodos();
      },
      (error)=>{
         //inserir toaster de erro
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
