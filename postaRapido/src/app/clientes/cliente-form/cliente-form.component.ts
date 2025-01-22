import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];

  constructor(
    private service: ClientesService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.cliente.dataNascimento = this.datePipe
      .transform(this.cliente.dataNascimento, 'dd/MM/yyyy');
      
    this.service
      .salvar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.cliente = response;
        
        setTimeout(() => {
          this.success = false;
        }, 3000);

        this.voltaLista()

      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;

        setTimeout(() => {
          this.errors = null;
        }, 3000);
      });
  }

  voltaLista() {
    this.router.navigate(['cliente-list'])
  }
}
