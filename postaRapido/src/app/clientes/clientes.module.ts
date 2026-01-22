import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule
  ],
  exports: [
    FormComponent,
    ListComponent
  ]
})
export class ClientesModule { }
