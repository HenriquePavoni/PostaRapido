import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from "./login/usuario";
import {Observable} from "rxjs";

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'token';
  private readonly usernameKey = 'username';

  constructor(private http: HttpClient) { }

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/api/auth/register', usuario);
  }

  login(usuario: Usuario): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:8080/api/auth/login`, usuario);
  }

  salvarToken(token: string, username?: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    if (username) {
      sessionStorage.setItem(this.usernameKey, username);
    }
  }

  obterToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  obterUsuarioLogado(): string | null {
    const username = sessionStorage.getItem(this.usernameKey);
    if (username) {
      return username;
    }

    const token = this.obterToken();
    if (!token) {
      return null;
    }

    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }

  estaAutenticado(): boolean {
    return !!this.obterToken();
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.usernameKey);
  }
}
