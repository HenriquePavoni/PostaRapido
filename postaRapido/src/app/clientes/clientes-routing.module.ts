import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';


const routes: Routes = [

  { path: '', component: ClientesListComponent },

  {path: 'form', component: ClientesFormComponent},
  {path: 'clientes-form/:status/:id', component: ClientesFormComponent},
  {path: 'clientes-form/:status', component: ClientesFormComponent},
  {path: 'clientes-list', component: ClientesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
