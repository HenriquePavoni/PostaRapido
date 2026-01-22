import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [

  { path: '', component: ListComponent },

  {path: 'form', component: FormComponent},
  {path: 'form/:status/:id', component: FormComponent},
  {path: 'form/:status', component: FormComponent},
  {path: 'list', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
