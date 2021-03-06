import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { ListaConteudosUsuarioComponent } from './components/conteudos/lista-conteudos-usuario/lista-conteudos-usuario.component';
import { ListaConteudosComponent } from './components/conteudos/lista-conteudos/lista-conteudos.component';
import { FormCursoComponent } from './components/cursos/form-curso/form-curso.component';
import { ListaCursoComponent } from './components/cursos/lista-curso/lista-curso.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cursos', component: ListaCursoComponent},
  {path: 'curso/adicionar', component:FormCursoComponent},
  {path: 'curso/editar/:id', component:FormCursoComponent},
  {path: 'curso/conteudos/:cursoId', component: ListaConteudosComponent},
  {path: 'home', component:HomeComponent },
  {path: 'home/curso/conteudos/:cursoId', component: ListaConteudosUsuarioComponent},
  {path: 'certificado/:id', component: CertificadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
