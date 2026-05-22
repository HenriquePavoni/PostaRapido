import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando = false;
  mensagemSucesso: string;
  mensagemErro: string;
  showPassword = false;
  loading = false;
  readonly currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private service: AuthService
  ) { }

  onSubmit() {
    if (!this.username?.trim() || !this.password?.trim()) {
      this.mensagemErro = 'Informe usuário e senha.';
      return;
    }

    this.loading = true;
    this.limparMensagens();

    // TODO: integrar com POST /api/auth/login quando o AuthService estiver pronto
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/home']);
    }, 400);
  }

  preparaCadastrar(event: Event) {
    event.preventDefault();
    this.cadastrando = true;
    this.limparMensagens();
  }

  cancelaCadastro() {
    this.cadastrando = false;
    this.limparMensagens();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cadastrar() {
    if (!this.username?.trim() || !this.password?.trim()) {
      this.mensagemErro = 'Preencha usuário e senha para cadastrar.';
      return;
    }

    const usuario: Usuario = new Usuario();
    usuario.username = this.username.trim();
    usuario.password = this.password;

    this.loading = true;
    this.limparMensagens();

    this.service.save(usuario).subscribe(
      () => {
        this.loading = false;
        this.mensagemSucesso = 'Usuário cadastrado com sucesso! Faça login para continuar.';
        this.cadastrando = false;
        this.password = '';

        setTimeout(() => {
          this.mensagemSucesso = null;
        }, 4000);
      },
      error => {
        this.loading = false;
        this.mensagemErro = this.extrairMensagemErro(error);

        setTimeout(() => {
          this.mensagemErro = null;
        }, 5000);
      }
    );
  }

  private limparMensagens() {
    this.mensagemErro = null;
    this.mensagemSucesso = null;
  }

  private extrairMensagemErro(error: any): string {
    const payload = error?.error;

    if (typeof payload === 'string') {
      return payload;
    }

    if (payload?.errors) {
      return Array.isArray(payload.errors)
        ? payload.errors.join(' ')
        : payload.errors;
    }

    if (payload?.message) {
      return payload.message;
    }

    return 'Não foi possível concluir a operação. Tente novamente.';
  }
}
