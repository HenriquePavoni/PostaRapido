import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';


const routes: Routes = [
  { path: 'pedidos-list', component: PedidosListComponent },
  { path: 'pedidos-form/:status/:id', component: PedidosFormComponent },
  { path: 'pedidos-form/:status', component: PedidosFormComponent },
  { path: 'pedidos-form', component: PedidosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
