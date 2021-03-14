import { Component, OnInit } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ejercicio2',
  templateUrl: './ejercicio2.component.html',
  styleUrls: ['./ejercicio2.component.css']
})
export class Ejercicio2Component implements OnInit {

  constructor(private http: HttpClient) {
    
  }

  celdas:boolean = true;
  datos:string = '';
  num1:string = '';
  num2:string = '';
  

  ngOnInit(): void {
    this.obtenerInformacionArchivo()
      .subscribe(response => this.datos = response);
  }

  obtenerInformacionArchivo() {
    return this.http.get('/assets/rutaarchivo.json')
      .pipe(
        switchMap((response: any) => this.http.get(response.pathToFile, {
          responseType: 'text'
        }))
      );
  }

  imprimir():void{
    //obtenemos los satos y almacenamos en un vector
    let datosVec:string[]=this.datos.toString().split('\n');
    //separamos dichos datos en vectores diferentes
    let primerNum:string[] = datosVec[0].toString().split('');
    let segundoNum:string[] = datosVec[1].toString().split('');
    //Corregimos los vectores
    let primerNumN:string[] = [];
    for (let i = 0; i < primerNum.length-1; i++) {
      primerNumN[i] = primerNum[i];
    }
    //concatenamos los vectores para mostrar los datos del txt
    let primerNumCo:string = '';
    let segundoNumCo:string = '';
    for (let i = 0; i < primerNumN.length; i++) {
      primerNumCo = primerNumCo + primerNumN[i];
    }
    for (let i = 0; i < segundoNum.length; i++) {
      segundoNumCo = segundoNumCo + segundoNum[i];
    }
    this.num1 = primerNumCo;
    this.num2 = segundoNumCo;
  }

  obtenerDatos():void{
    this.imprimir();
  }

  calcular():void{
    

    //
  }
}
