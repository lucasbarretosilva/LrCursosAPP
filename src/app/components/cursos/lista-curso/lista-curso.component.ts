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
  
  constructor(private cursoService: CursosService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obterTodos();
  }

  obterTodos(): void{
    this.cursoService.obterTodos().subscribe(
      (resposta)=>{
        this.cursos = resposta;
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
