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
  mensagens: String[] = [];

  constructor(
    private service: PedidoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.service
      .getAllPedidos()
      .subscribe(
        resposta => {
          this.listaPedidos = resposta;
        }
      )

    const state = window.history.state;
    if (state && state.mensagens) {
      this.mensagens = Array.isArray(state.mensagens) ? state.mensagens : [state.mensagens];

      setTimeout(() => {
        this.mensagens = null;
      }, 3000);
    }
  }

  novoPedido() {
    this.router.navigate(['/pedidos-form/create'])
  }

}
