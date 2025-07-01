import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from './pedidos/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('http://localhost:8080/api/pedido');
  }

  getAllPedidosFilter(nomeCliente: string, statusPedido: string): Observable<Pedido[]> {

    if(nomeCliente == null) {
      nomeCliente = "";
    }

    if(statusPedido == null) {
      statusPedido = "";
    }

    const httpParams = new HttpParams()
      .set("nomeCliente", nomeCliente)
      .set("statusPedido", statusPedido);

    const url = 'http://localhost:8080/api/pedido/filtro?' + httpParams;
    return this.http.get<any>(url);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`http://localhost:8080/api/pedido/${id}`)
  }

  save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>('http://localhost:8080/api/pedido', pedido);
  }

  updatePedido(pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(`http://localhost:8080/api/pedido/${pedido.id}`, pedido);
  }

  deletePedido(pedido: Pedido): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/pedido/${pedido.id}`);
  }
}
