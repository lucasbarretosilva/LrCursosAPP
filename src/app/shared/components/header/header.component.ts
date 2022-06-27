import { Component, OnInit } from '@angular/core';
import { Autenticacao } from 'src/app/models/autenticacao.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  isManager:boolean = false;

  constructor() { }

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

}
