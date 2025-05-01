import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { PedidoService } from 'src/app/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  listaPedidos: Pedido[] = [];

  constructor(
    private service: PedidoService,
    private router: Router,
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
    this.router.navigate(['/pedidos-form'])
  }

}
