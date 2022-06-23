import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaConteudosComponent } from './components/conteudos/lista-conteudos/lista-conteudos.component';
import { FormCursoComponent } from './components/cursos/form-curso/form-curso.component';
import { ListaCursoComponent } from './components/cursos/lista-curso/lista-curso.component';

const routes: Routes = [
  {path: '', component: ListaCursoComponent},
  {path: 'curso/adicionar', component:FormCursoComponent},
  {path: 'curso/editar/:id', component:FormCursoComponent},
  {path: 'curso/conteudos/:cursoId', component: ListaConteudosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
