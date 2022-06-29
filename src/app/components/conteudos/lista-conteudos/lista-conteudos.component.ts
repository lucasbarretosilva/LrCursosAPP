import { Conteudo } from './../../../models/conteudo.model';
import { ConteudoService } from './../../../services/conteudo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  conteudosFiltrado: any = [];

   private _filtroLista: string = '';

   public get filtroLista(){
     return this._filtroLista
   }

   public set filtroLista(value: string){
    this._filtroLista = value;
    this.conteudosFiltrado = this.filtroLista ? this.filtrarConteudo(this.filtroLista) : this.conteudos;
  }

  filtrarConteudo(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.conteudos.filter(
      (conteudo: {tituloAula:string}) => conteudo.tituloAula.toLocaleLowerCase().indexOf(filtrarPor)!== -1
     );
  }

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  isManager: boolean = false;

  constructor(
    private conteudoService: ConteudoService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.formulario = new FormGroup({
      conteudoId: new FormControl(0),
      tituloAula: new FormControl(null, Validators.required),
      urlAula: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
    } 
    if(this.usuarioAutenticado?.isManager == true){
      this.isManager = true;
    }
    
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cursoId = params.get('cursoId');
      this.obterConteudosPorCurso(this.cursoId);
    });
  }

  obterConteudosPorCurso(cursoId: any): void {
    this.conteudoService.obterConteudosPorCurso(cursoId).subscribe(
      (resposta) => {
        this.conteudos = resposta;
        this.conteudosFiltrado= this.conteudos;
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
   if(this.formulario.valid){
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
   }else{
    this.toastr.error('Preencha todos os campos', 'Atenção!');
   }
  }

  getUsuario(){
    const usuario = window.sessionStorage.getItem("usuario");
    if(usuario != null){
      return JSON.parse(usuario)
    }
    return null;
  };

}
