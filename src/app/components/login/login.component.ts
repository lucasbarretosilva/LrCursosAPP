import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any;
  constructor(private autenticacaoService: AutenticacaoService, private router: Router, private toastr: ToastrService) { 
    this.usuario = new FormGroup({
      email: new FormControl(null),
      senha: new FormControl(null),    
    });
  }

  ngOnInit(): void {
  }

  login(): void{

    const email = this.usuario.get('email').value;
    const senha = this.usuario.get('senha').value;

    this.autenticacaoService.obterUsuarioPorEmailSenha(email, senha).subscribe(
      (resposta)=>{
        window.sessionStorage.setItem('usuario', JSON.stringify(resposta));
        this.router.navigate(['home']);
      },
      (error)=>{
        this.toastr.error('Ocorreu um erro', 'Atenção!');
      }
    )
  }

}
