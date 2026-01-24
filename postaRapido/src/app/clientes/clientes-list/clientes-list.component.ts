import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  listaClientes: Cliente[] = [];
  mensagens: string[] = [];

  constructor(
    private service: ClientesService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.service
      .getAllClientes()
      .subscribe(
        resposta => {
          this.listaClientes = resposta;
        });
    const state = window.history.state;
    if (state && state.mensagens) {
      this.mensagens = Array.isArray(state.mensagens) ? state.mensagens : [state.mensagens];

      setTimeout(() => {
        this.mensagens = null;
      }, 3000);
    }
  }

  novoCliente() {
    this.router.navigate([`/clientes/clientes-form/create`]);
  }
}
