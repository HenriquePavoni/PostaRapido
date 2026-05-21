import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from "./login/usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/api/auth/register', usuario);
  }
}
