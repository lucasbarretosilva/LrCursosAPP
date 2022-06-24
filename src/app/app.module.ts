import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCursoComponent } from './components/cursos/form-curso/form-curso.component';
import { ListaCursoComponent } from './components/cursos/lista-curso/lista-curso.component';
import { CursosService } from './services/cursos.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { ListaConteudosComponent } from './components/conteudos/lista-conteudos/lista-conteudos.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ListaConteudosUsuarioComponent } from './components/conteudos/lista-conteudos-usuario/lista-conteudos-usuario.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaCursoComponent,
    FormCursoComponent,
    ListaConteudosComponent,
    HomeComponent,
    ListaConteudosUsuarioComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule 
  ],
  providers: [HttpClientModule, CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
