import { Conteudo } from './../../models/conteudo.model';
import { Curso } from './../../models/curso.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'testeAcordion';

  cursos: Curso[] = []; 
  conteudos: Conteudo[] = [];
  formulario: any;

  constructor(private cursoService: CursosService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cursoService.obterTodos().subscribe((resultado) => (this.cursos = resultado));
  }


}
