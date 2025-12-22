import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { LayoutComponent } from '../layout/layout.component';


const routes: Routes = [
  {path: 'pedidos', component: LayoutComponent, children: [
    { path: 'list', component: PedidosListComponent },
    { path: 'form/:status/:id', component: PedidosFormComponent },
    { path: 'form/:status', component: PedidosFormComponent },
    { path: 'form', component: PedidosFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
