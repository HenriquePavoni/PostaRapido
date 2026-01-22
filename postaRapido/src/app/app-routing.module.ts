import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";


const routes: Routes = [
  {path : 'login', component: LoginComponent},

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path : 'home', component: HomeComponent},
      {
        path : 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
