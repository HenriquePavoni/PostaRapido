import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PedidosListComponent, PedidosFormComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    PedidosFormComponent,
    PedidosListComponent
  ]
})
export class PedidosModule { }
