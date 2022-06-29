import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css'],
})
export class FormCursoComponent implements OnInit {
  formulario: any;
  curso: Curso | undefined;
  id: any;

  usuarioAutenticado = this.getUsuario();
  autenticado: boolean = false;
  isManager: boolean = false;

  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formulario = new FormGroup({
      cursoNome: new FormControl(null, Validators.required),
      imagemUrl: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
      duracao: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.usuarioAutenticado?.liberado == true) {
      this.autenticado = true;
    }
    if (this.usuarioAutenticado?.isManager == true) {
      this.isManager = true;
    }

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.cursosService.obterPorId(this.id).subscribe((resultado) => {
        this.formulario.patchValue(resultado);
      });
    });
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const curso: Curso = this.formulario.value;

      if (this.id && this.id > 0) {
        curso.cursoId = this.id;

        this.cursosService.atualizar(curso).subscribe(() => {
          this.toastr.success('Dados atualizados', 'Sucesso!');
          this.router.navigate(['cursos']);
        });
      } else {
        this.cursosService.salvar(curso).subscribe((resposta) => {
          this.id = resposta.cursoId;
          this.toastr.success(
            'Cadastro Realizado! Clique em Conteúdos para continuar o cadastro ',
            'Sucesso!'
          );
        });
      }
    } else {
      this.toastr.error('Preencha todos os campos', 'Atenção!');
    }
  }

  getUsuario() {
    const usuario = window.sessionStorage.getItem('usuario');
    if (usuario != null) {
      return JSON.parse(usuario);
    }
    return null;
  }
}
