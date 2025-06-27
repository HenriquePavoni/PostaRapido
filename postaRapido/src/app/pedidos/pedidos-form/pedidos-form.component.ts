import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PedidoService } from 'src/app/pedido.service';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { STATUS_PEDIDO } from '../enum';

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
  statusPedidoList = STATUS_PEDIDO;

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
    this.id = params['id'];
    this.status = params['status'];
  
    this.clienteService.getAllClientes().subscribe(clientes => {
      this.listaClientes = clientes;
  
      if (this.id) {
        this.pedidoSerivce.getPedidoById(this.id).subscribe(response => {
          this.pedido = response;
          this.pedido.cliente = this.listaClientes.find(c => c.id === this.pedido.cliente.id);
        }, errorResponse => {
          this.pedido = new Pedido();
        });
      }
    });
  }
  

  onSubmit() {
    this.pedido.cliente = this.listaClientes.find(c => c.id == this.pedido.cliente.id);
    if (this.status == 'update') {
      this.pedidoSerivce
        .updatePedido(this.pedido)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.enviaMensagens();

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
          this.enviaMensagens();

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

    if (this.status == 'create') {
      this.pedidoSerivce
        .save(this.pedido)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.pedido = response;
          this.enviaMensagens();

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
  }

  voltarLista() {
    this.router.navigate(['pedidos-list'])
  }

  enviaMensagens() {

    if (this.errors != null) {
      this.router.navigate(['cliente-list'], {
        state: { mensagens: this.errors }
      });
    }

    let msg = '';
    if (this.status === 'create') msg = 'Pedido cadastrado com sucesso.';
    if (this.status === 'update') msg = 'Pedido atualizado com sucesso.';
    if (this.status === 'delete') msg = 'Pedido excluído com sucesso.';

    this.router.navigate(['pedidos-list'], {
      state: { mensagens: [msg] }
    });
  }
}
