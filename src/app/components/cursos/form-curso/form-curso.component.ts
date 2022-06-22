import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit {
  formulario: any;
  curso: Curso | undefined;
  id: any;
  
  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    this.formulario = new FormGroup({
      cursoNome: new FormControl(null),
      imagemUrl: new FormControl(null),
      descricao: new FormControl(null),    
    });
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cursosService
        .obterPorId(this.id)
        .subscribe((resultado) => {
          this.formulario.patchValue(resultado)
        });
    });
  }

  enviarFormulario(): void {
    const curso: Curso = this.formulario.value;
    
    if (this.id && this.id > 0) {

      curso.cursoId = this.id;

      this.cursosService.atualizar(curso).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.cursosService.salvar(curso).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

}
