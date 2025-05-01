import { HttpClient } from '@angular/common/http';
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
