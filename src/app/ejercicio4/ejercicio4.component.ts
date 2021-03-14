import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ejercicio4',
  templateUrl: './ejercicio4.component.html',
  styleUrls: ['./ejercicio4.component.css']
})
export class Ejercicio4Component implements OnInit {

  habilitar:boolean = true;
  palabra:string = '';
  palabras:string = '';
  anagramasR:string = '';
  permutaciones:string[] = [];
  sinRepetidos:string[] = [];
  palabraActivar:boolean = false;
  btnBuscar:boolean = false;
  btnReiniciar:boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerInformacionArchivo()
      .subscribe(response => this.palabras = response);
  }

  obtenerInformacionArchivo() {
    return this.http.get('/assets/rutaarchivopalabras.json')
      .pipe(
        switchMap((response: any) => this.http.get(response.pathToFile, {
          responseType: 'text'
        }))
      );
  }

  buscar():void{
    this.anagramasR = '';
    this.sinRepetidos = [];
    if(this.palabra === undefined || this.palabra === ''){
      alert('Ingrese una palabra...');
    }else{
      this.permutaciones = this.permutar(this.palabra.toLowerCase());
       //obtenemos los datos y almacenamos en un vector
       let palabrasSinSepVec:string[]=this.palabras.toString().split('\n');
       //Comparamos las permutaciones con nuestro diccionario
       let anagramasEncontrados:string[] =[];
       let cont:number = 0;
       for (let i = 0; i < this.permutaciones.length; i++) {
         let existe:boolean = palabrasSinSepVec.includes(this.permutaciones[i]);
         if(existe === true){
           anagramasEncontrados[cont] = this.permutaciones[i];
           cont++;
         }
       }
       if(cont === 0){
        alert('No hay anagramas que mostrar');
        this.palabra = '';
       }else{
         //eliminamos anagramas repetidos
        for(var i = 0; i < anagramasEncontrados.length; i++) {         
          if (!this.sinRepetidos.includes(anagramasEncontrados[i])) {
            this.sinRepetidos.push(anagramasEncontrados[i]);
          }
        }
        //Enviamos el resultado
        let resultadoTA:string = '';
        for (let i = 0; i < this.sinRepetidos.length; i++) {
          resultadoTA = resultadoTA + this.sinRepetidos[i] + '\n';
        }
        this.anagramasR = resultadoTA;
        this.palabraActivar = true;
        this.btnBuscar = true;
        this.btnReiniciar = false;
       }
    }
    
  }
  
  intercambiar(caracteres:string[],i:number,j:number):void{
    let aux:string = caracteres[i];
    caracteres[i] = caracteres[j];
    caracteres[j] = aux;
  }

  permutar(palabra:string):string[]{
    let cont:number[] = []; 
    let anagramas:string[] = []; 
    let caracteres:string[]= palabra.toString().split('');
    let caracLon:number = caracteres.length;
    let i:number = 0;
  
    for (let i = 0; i < caracLon; i++) {
      cont[i] = 0;   
    }
    if(caracteres.length > 8){

    }else{
      while(i < caracLon){
        if(cont[i] < i){
          this.intercambiar(caracteres, i%2 === 1 ? cont[i] : 0, i);
          cont[i]++;
          i = 0;
          anagramas.push(caracteres.join('').toLowerCase());
        }else{
          cont[i] = 0;
          i++;
        }
      }
    }

    return anagramas;
  }

  restablecer():void{
    this.anagramasR = '';
    this.sinRepetidos = [];
    this.palabra = '';
    this.palabraActivar = false;
    this.btnBuscar = false;
    this.btnReiniciar = true;
  }
}
