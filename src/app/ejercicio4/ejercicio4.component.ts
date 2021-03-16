import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ejercicio4',
  templateUrl: './ejercicio4.component.html',
  styleUrls: ['./ejercicio4.component.css']
})
export class Ejercicio4Component implements OnInit {

 
  constructor(private http: HttpClient) {
    
  }

  datos:string = '';
  txtArea:boolean = true;
  impreso:string = '';
  numOracionesS:string = '';
  numOraciones:number = 0;
  abecedario:string[]=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

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
  visualizar():void{
    this.impreso = this.datos;
    let todosDatos:string[]=this.datos.toString().split('\n');
    this.numOracionesS = todosDatos[0];
    this.numOraciones = Number(todosDatos[0]);
    let cadena:string = "Jove xef, porti whisky amb quinze glaçons d'hidrogen";
    let resultado = cadena.replace(/[^a-zA-Z á-ü \d{4}]/g, '');
    let resultadoNormalizado:string = resultado.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let resultadoSinEspacios:string = resultadoNormalizado.replace(/\s+/g, '');
    let resultadoCompleto:string = resultadoSinEspacios.toLowerCase();
    console.log(resultadoCompleto.length + ' ' + resultadoCompleto);
  }

}
