import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CepService } from 'src/app/cep.service';
import { Cep } from 'src/app/cep';

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
  cep: Cep;


  constructor(
    private clienteService: ClientesService,
    private cepService: CepService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
    this.cep = new Cep();
  }

  ngOnInit(): void {
    let params: Params = this.activatedRoute.snapshot.params;

    this.id = params['id'];
    this.status = params['status'];

    if (this.id != null) {
      this.clienteService
        .getClienteById(this.id)
        .subscribe(
          response => {
            this.cliente = response;

          },
          errorResponse => this.cliente = new Cliente()
        )
    }
  }

  completaCep() {
    this.cepService.getBuscaCep(this.cliente.cep)
    .subscribe(response => {
      this.cep = response;
      
      this.cliente.endereco = this.cep.logradouro;
      this.cliente.cidade = this.cep.localidade;
      this.cliente.estado = this.cep.uf;
    })
  }

  onSubmit() {
    if (this.status === 'update') {
      this.clienteService
        .updateCliente(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.enviaMensagens();

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
      this.clienteService
        .deleteCliente(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.enviaMensagens();

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

    if (this.status === 'create') {
      this.clienteService
        .save(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
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

  voltaLista() {
    this.router.navigate(['cliente-list'])
  }

  enviaMensagens() {

    if (this.errors != null) {
      this.router.navigate(['cliente-list'], {
        state: { mensagens: this.errors }
      });
    }

    let msg = '';
    if (this.status === 'create') msg = 'Cliente cadastrado com sucesso.';
    if (this.status === 'update') msg = 'Cliente atualizado com sucesso.';
    if (this.status === 'delete') msg = 'Cliente excluído com sucesso.';

    this.router.navigate(['cliente-list'], {
      state: { mensagens: [msg] }
    });
  }

}
