import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Autenticacao } from 'src/app/models/autenticacao.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    size: 'md',
    centered: true,
  };

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  isManager:boolean = false;

  constructor( private router: Router,  private modalService: NgbModal,) { }

  ngOnInit(): void {
    if(this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
    } 
    if(this.usuarioAutenticado?.isManager == true){
      this.isManager = true;
    }
  }

  getUsuario(){
    const usuario = window.sessionStorage.getItem("usuario");
    if(usuario != null){
      return JSON.parse(usuario)
    }
    return null;
  };

  modalSair(htmlModal: any) {

    this.modalService
      .open(htmlModal, this.modalOptions)
      .result.then((resposta) => {
        if(resposta){
          window.sessionStorage.removeItem("usuario");
          this.router.navigate(['login']);
        }
      });
  }

}
