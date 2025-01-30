import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  id: number;
  status: String;


  constructor(
    private service: ClientesService,
    private router: Router,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.id = params['id'];
      this.status = params['status'];

      this.service
        .getClienteById(this.id)
        .subscribe(
          response => {
            this.cliente = response;

          },
          errorResponse => this.cliente = new Cliente()
        )
    }
  }

  onSubmit() {
    if (this.status === 'update') {
      this.service
        .updateCliente(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        }, errorResponse => {
          this.errors = errorResponse.error.errors;

          setTimeout(() => {
            this.errors = null;
          }, 3000);
        });
      return;
    }

    if (this.status === 'delete') {
      this.service
        .deleteCliente(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        }, errorResponse => {
          this.errors = errorResponse.error.errors;

          setTimeout(() => {
            this.errors = null;
          }, 3000);
        })
      return;
    }

    this.cliente.dataNascimento = this.datePipe
      .transform(this.cliente.dataNascimento, 'dd/MM/yyyy');

    this.service
      .save(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.cliente = response;

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

  voltaLista() {
    this.router.navigate(['cliente-list'])
  }

  formatarData(data: string): string {
    const partes = data.split('/');
    const ano = partes[2];
    const mes = partes[1].padStart(2, '0');
    const dia = partes[0].padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
