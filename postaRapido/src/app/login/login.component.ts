import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {Usuario} from "./usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private router: Router,
    private service: AuthService
  ) { }

  onSubmit() {
    this.router.navigate(['/home']);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {

    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.service.save(usuario).subscribe(
      response => {
        this.mensagemSucesso = 'Usuario cadastrado com sucesso!';

        setTimeout(() => {
          this.mensagemSucesso = null;
        }, 2000);
      }, error => {
        this.mensagemErro = error.error.errors;

        setTimeout(() => {
          this.mensagemErro = null;
        }, 2000);
      }
    );
  }
}
