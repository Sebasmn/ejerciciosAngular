import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ejercicio1Component } from './ejercicio1/ejercicio1.component';
import { Ejercicio2Component } from './ejercicio2/ejercicio2.component';
import { Ejercicio3Component } from './ejercicio3/ejercicio3.component';
import { Ejercicio4Component } from './ejercicio4/ejercicio4.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BannerComponent } from './banner/banner.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    Ejercicio1Component,
    Ejercicio2Component,
    Ejercicio3Component,
    Ejercicio4Component,
    BannerComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
