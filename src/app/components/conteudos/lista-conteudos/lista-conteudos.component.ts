import { Conteudo } from './../../../models/conteudo.model';
import { ConteudoService } from './../../../services/conteudo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-conteudos',
  templateUrl: './lista-conteudos.component.html',
  styleUrls: ['./lista-conteudos.component.css'],
})
export class ListaConteudosComponent implements OnInit {
  formulario: any;

  modalOptions: NgbModalOptions = {
    size: 'lg',
    centered: true,
  };

  conteudos: Conteudo[] = [];

  cursoId: any;

  constructor(
    private conteudoService: ConteudoService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.formulario = new FormGroup({
      conteudoId: new FormControl(0),
      tituloAula: new FormControl(null),
      urlAula: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cursoId = params.get('cursoId');
      this.obterConteudosPorCurso(this.cursoId);
    });
  }

  obterConteudosPorCurso(cursoId: any): void {
    this.conteudoService.obterConteudosPorCurso(cursoId).subscribe(
      (resposta) => {
        this.conteudos = resposta;
      },
      (error) => {
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    );
  }

  abrirModalEdicao(htmlModal: any, conteudo: Conteudo) {
    this.formulario.patchValue(conteudo)
    this.modalService
      .open(htmlModal, this.modalOptions)
      .result.then((resposta) => {
        if (resposta) {
          this.enviarFormulario();
        }
      });
  }

  abrirModal(htmlModal: any) {
    this.modalService
      .open(htmlModal, this.modalOptions)
      .result.then((resposta) => {
        if (resposta) {
          this.enviarFormulario();
        }
      });
  }

  abrirModalDeletar(htmlModal:any,id:number) {
    this.modalService.open(htmlModal,this.modalOptions).result.then(
      (resposta) => {
        if(resposta){
          this.deletar(id);
        }
      }
    )
  }

  deletar(id:number):void{
    this.conteudoService.deletar(id).subscribe(
      ()=>{
        this.toastr.success('', 'Registro Deletado!');
        this.obterConteudosPorCurso(this.cursoId);
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

  enviarFormulario(): void {
    const conteudo: Conteudo = this.formulario.value;
    conteudo.cursoId = parseInt(this.cursoId);

    if (conteudo.conteudoId && conteudo.conteudoId > 0) {
      this.conteudoService.atualizar(conteudo).subscribe(() => {
        this.modalService.dismissAll();
        this.toastr.success('Registro Atualizado', 'Sucesso!');
        this.obterConteudosPorCurso(this.cursoId);
      });
    } else {
      this.conteudoService.salvar(conteudo).subscribe(() => {
        this.modalService.dismissAll();
        this.toastr.success('Registro Salvo', 'Sucesso!');
        this.obterConteudosPorCurso(this.cursoId);
      });
    }
  }
}
