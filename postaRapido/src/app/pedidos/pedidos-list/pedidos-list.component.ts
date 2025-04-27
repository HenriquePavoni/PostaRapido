import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { PedidoService } from 'src/app/pedido.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  listaPedidos: Pedido[] = [];

  constructor(
    private service: PedidoService,
  ) {}

  ngOnInit(): void {
    this.service
    .getAllPedidos()
    .subscribe(
      resposta => {
        this.listaPedidos = resposta;
      }
    )
  }

  novoPedido() {
    
  }

}
