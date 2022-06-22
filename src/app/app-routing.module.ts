import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCursoComponent } from './components/cursos/form-curso/form-curso.component';
import { ListaCursoComponent } from './components/cursos/lista-curso/lista-curso.component';

const routes: Routes = [
  {path: '', component: ListaCursoComponent},
  {path: 'curso/adicionar', component:FormCursoComponent},
  {path: 'curso/editar/:id', component:FormCursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
