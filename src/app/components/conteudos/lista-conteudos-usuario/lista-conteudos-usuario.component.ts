import { Conteudo } from '../../../models/conteudo.model';
import { ConteudoService } from '../../../services/conteudo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-conteudos-usuario',
  templateUrl: './lista-conteudos-usuario.component.html',
  styleUrls: ['./lista-conteudos-usuario.component.css'],
})
export class ListaConteudosUsuarioComponent implements OnInit {
  formulario: any;

  modalOptions: NgbModalOptions = {
    size: 'lg',
    centered: true,
  };

  conteudos: Conteudo[] = [];
  cursoId: any;
  conteudoId: any;
  url = '';
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
    if(this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
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

  abrirModalAssistirAula(htmlModal: any,conteudo:Conteudo) {
    this.url = conteudo.urlAula;

    this.modalService
      .open(htmlModal, this.modalOptions)
      .result.then((resposta) => {
      });
  }

  getUsuario(){
    const usuario = window.sessionStorage.getItem("usuario");
    if(usuario != null){
      return JSON.parse(usuario)
    }
    return null;
  };

}

