import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {path : '', component: LayoutComponent, children: [
    {path : 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
  ]},
  {path : 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
