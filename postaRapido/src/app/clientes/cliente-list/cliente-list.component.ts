import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  listaClientes: Cliente[] = [];

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

          this.listaClientes.forEach(cliente => cliente.dataNascimento = this.datePipe
            .transform(cliente.dataNascimento, 'dd/MM/yyyy'));
        });
      
  }

  novoCliente() {
    this.router.navigate(['/cliente-form'])
  }
}
