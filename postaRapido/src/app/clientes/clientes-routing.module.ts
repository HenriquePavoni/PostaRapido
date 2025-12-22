import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { LayoutComponent } from '../layout/layout.component';


const routes: Routes = [
  {path: 'clientes', component: LayoutComponent, children: [

    {path: 'form', component: ClienteFormComponent},
    {path: 'form/:status/:id', component: ClienteFormComponent},
    {path: 'form/:status', component: ClienteFormComponent},
    {path: 'list', component: ClienteListComponent},
    {path: '', redirectTo: '/clientes/list', pathMatch: 'full'},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
