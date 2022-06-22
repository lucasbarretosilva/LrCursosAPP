import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCursoComponent } from './components/cursos/form-curso/form-curso.component';
import { ListaCursoComponent } from './components/cursos/lista-curso/lista-curso.component';
import { CursosService } from './services/cursos.service';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaCursoComponent,
    FormCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [HttpClientModule, CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
