import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ActivatedRoute, Data } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Curso } from 'src/app/models/curso.model';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit{

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  data = new Date();
  curso: Curso | undefined;
  id: any;
  
  constructor( private activatedRoute: ActivatedRoute,private cursosService: CursosService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cursosService
        .obterPorId(this.id)
        .subscribe((resultado) => {
          this.curso = resultado;
        });
    })

     if(this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
    } 
  }

  public exportHtmlToPDF(){
    let data = document.getElementById('certificado')!;
      
      html2canvas(data).then(canvas => {
          
          let docWidth = (canvas.width * 86)/ 240;
          let docHeight = (canvas.height * 83) / 240;
          
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('l', 'mm', 'a4');
          let position = 1;
          doc.addImage(contentDataURL, 'PNG', 7, position, docWidth, docHeight)
          
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
