import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit{

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
     if(this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
    } 
  }

  public exportHtmlToPDF(){
    let data = document.getElementById('certificado')!;
      
      html2canvas(data).then(canvas => {
          
          let docWidth = 300;
          let docHeight = canvas.height * docWidth / canvas.width;
          
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('l', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          
          doc.save('certificado.pdf');
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
