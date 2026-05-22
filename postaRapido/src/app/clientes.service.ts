import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
  }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  getAllClientesFilter(nomeCliente: string, statusPedido: string): Observable<Cliente[]> {

    if(nomeCliente == null) {
      nomeCliente = "";
    }

    if(statusPedido == null) {
      statusPedido = "";
    }

    const httpParams = new HttpParams()
      .set("nomeCliente", nomeCliente)
      .set("statusPedido", statusPedido);

    const url = 'http://localhost:8080/api/clientes/filtro?' + httpParams;
    return this.http.get<any>(url);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`http://localhost:8080/api/clientes/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
  }

  deleteCliente(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/clientes/${cliente.id}`);
  }

}
