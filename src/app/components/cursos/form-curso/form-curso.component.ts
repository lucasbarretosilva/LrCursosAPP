import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit {
  formulario: any;
  cursos: Curso[] = [];
  
  constructor(private cursosService: CursosService ) { }

  ngOnInit(): void {
    this.cursosService
    .obterTodos()
    .subscribe((resultado) => (this.cursos = resultado));


    this.formulario = new FormGroup({
      //  forms controle são os inputs
      cursoNome: new FormControl(null),
      imagemUrl: new FormControl(null),
      descricao: new FormControl(null),
      
    });
    
  }

  EnviarFormulario(): void {
    //criar as variaveis para ter os dados do form
    // this.formulario = new FormGroup({
    //   //  forms controle são os inputs
    //   cursoNome: new FormControl(null),
    //   imagemUrl: new FormControl(null),
    //   descricao: new FormControl(null),
      
    // });
  

    const curso: Curso = this.formulario.value;
    

    if (curso.cursoId > 0) {
      this.cursosService.atualizar(curso).subscribe((resultado) => {
       

        

        this.cursosService.obterTodos().subscribe((registros) => {
          this.cursos = registros;
        });
      });
    } else {
      this.cursosService.salvar(curso).subscribe((resultado) => {
        

        

        this.cursosService.obterTodos().subscribe((registros) => {
          this.cursos = registros;
        });
      });
    }
  }

}
