import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Ejercicio1Component} from './ejercicio1/ejercicio1.component';
import {Ejercicio2Component} from './ejercicio2/ejercicio2.component';
import {Ejercicio3Component} from './ejercicio3/ejercicio3.component';
import {Ejercicio4Component} from './ejercicio4/ejercicio4.component';

const routes: Routes = [
  {
    component:Ejercicio1Component,
    path:''
  },
  {
    component:Ejercicio1Component,
    path:'ejercicio1'
  },
  {
    component:Ejercicio2Component,
    path:'ejercicio2'
  },
  {
    component:Ejercicio3Component,
    path:'ejercicio3'
  },
  {
    component:Ejercicio4Component,
    path:'ejercicio4'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
