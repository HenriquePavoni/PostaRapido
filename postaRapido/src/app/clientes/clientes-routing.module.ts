import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';


const routes: Routes = [
  {path: 'cliente-form', component: ClienteFormComponent},
  {path: 'cliente-form/:status/:id', component: ClienteFormComponent},
  {path: 'cliente-list', component: ClienteListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
