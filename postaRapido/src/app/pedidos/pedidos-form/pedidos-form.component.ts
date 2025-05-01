import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PedidoService } from 'src/app/pedido.service';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent implements OnInit {

  pedido: Pedido;
  id: number;
  status: String;
  listaClientes: Cliente[] = [];
  success: boolean = false;
  errors: String[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pedidoSerivce: PedidoService,
    private clienteService: ClientesService,
  ) {
    this.pedido = new Pedido();
  }

  ngOnInit(): void {
    let params: Params = this.activatedRoute.snapshot.params;

    this.clienteService
      .getAllClientes()
      .subscribe(
        resposta => {
          this.listaClientes = resposta;
        });

    if (params['id']) {
      this.id = params['id'];
      this.status = params['status'];

      this.pedidoSerivce
        .getPedidoById(this.id)
        .subscribe(response => {
          this.pedido = response;

          this.pedido.cliente = this.listaClientes.find(c => c.id ==this.pedido.cliente.id);
        }, ErrorResponse => {
          this.pedido = new Pedido();
        })
    }
  }

  onSubmit() {
    if (this.status == 'update') {
      this.pedidoSerivce
        .updatePedido(this.pedido)
        .subscribe(response => {
          this.success = true;
          this.errors = null;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;

          setTimeout(() => {
            this.errors = null;
          }, 3000);
        })
      return;
    }

    if (this.status == 'delete') {
      this.pedidoSerivce
        .deletePedido(this.pedido)
        .subscribe(response => {
          this.success = true;
          this.errors = null;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        })
      return;
    }

    this.pedidoSerivce
      .save(this.pedido)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.pedido = response;

        setTimeout(() => {
          this.success = false;
        }, 3000);
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;

        setTimeout(() => {
          this.errors = null;
        }, 3000);
      });
  }

  voltarLista() {
    this.router.navigate(['/pedidos-list'])
  }
}
