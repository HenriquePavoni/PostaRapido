import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  listaClientes: Cliente[] = [];

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service
      .getAllClientes()
      .subscribe(resposta => this.listaClientes = resposta);
  }

  novoCliente() {
    this.router.navigate(['/cliente-form'])
  }
}
