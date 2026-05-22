import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';
import { STATUS_CLIENTE } from '../enum';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['../clientes-page.css']
})
export class ClientesListComponent implements OnInit {

  listaClientes: Cliente[] = [];
  mensagens: String[] = [];
  filtroNomeCliente: string;
  filtroStatusPedido: string;
  statusPedidoList = STATUS_CLIENTE;
  mensagemTabela: string;

  constructor(
    private service: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.service
      .getAllClientes()
      .subscribe(
        resposta => {
          this.listaClientes = resposta;
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

  buscar() {
    this.listaClientes = [];

    this.service
      .getAllClientesFilter(this.filtroNomeCliente, this.filtroStatusPedido)
      .subscribe(response => {
        this.listaClientes = response;

        if(this.listaClientes.length <= 0) {
          this.mensagemTabela = "Nenhum resultado encontrado.";
        } else {
          this.mensagemTabela = null;
        }
      });


  }

  novoCliente() {
    this.router.navigate(['/clientes/clientes-form/create'])
  }

}
