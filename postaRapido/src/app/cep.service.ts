import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cep } from './cep';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

    getBuscaCep(cep: string): Observable<Cep> {
      return this.http.get<Cep>(`http://localhost:8080/api/cep/${cep}`);
    }
}
