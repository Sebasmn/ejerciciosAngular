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
  btnResultado:boolean = true;
  btnVisualizar:boolean = false;
  impreso:string = '';
  numOracionesS:string = '';
  numOraciones:number = 0;
  abecedario:string[]=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  vecResLim:string[] = [];
  datosNormalizados:string[] = [];

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
    //Obtenemos la cantidad de oraciones que debe existir en el txt
    let todosDatos:string[]=this.datos.toString().split('\n');
    this.numOracionesS = todosDatos[0];
    this.numOraciones = Number(todosDatos[0]);
   
    //Normalizamos los datos ingresados en nuestro txt 
    //tomando los valores desde la segunda línea
    for (let i = 1; i < todosDatos.length; i++) {
      let resultado = todosDatos[i].replace(/[^a-zA-Z á-ü \d{4}]/g, '');
      let resultadoNormalizado:string = resultado.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      let resultadoSinEspacios:string = resultadoNormalizado.replace(/\s+/g, '');
      let resultadoCompleto:string = resultadoSinEspacios.toLowerCase();
      this.datosNormalizados.push(resultadoCompleto);
    }
    
    for (let i = 0; i < this.datosNormalizados.length; i++) {
      //limitamos los caracteres permitidos (255)
      let longitud:number = 255;
      let resultadoLimitado:string = this.datosNormalizados[i].substring(0, longitud);
      this.vecResLim.push(resultadoLimitado);
    }
    if(this.numOraciones !== this.vecResLim.length){
      alert('Número de oraciones no es igual que las oraciones instanciadas en el txt');
    }else{
      this.btnResultado = false;
      this.btnVisualizar = true;
      this.impreso = this.datos;
    }
    
  }

  resultadoG():void{
    let vecSep:number[] = [];
    let abdAux:string[] = [];
    //Obtenemos el numero total de letras del abecedario de nuestra oracion
    for (let i = 0; i < this.vecResLim.length; i++) {
      let vecAux:string[] = [];
      abdAux = this.abecedario;
      vecAux = this.vecResLim[i].toString().split('');
      let vecAbc:string[]=[];
      for (let k = 0; k < vecAux.length; k++) {
        if(abdAux.includes(vecAux[k]) === true && vecAbc.includes(vecAux[k]) === false){
          vecAbc.push(vecAux[k]);
        }
      } 
      vecSep.push(vecAbc.length);
    }
    //Generamos un vector dond indicamos si es o no un anagrama
    let vecSiNo:string[] =[];
    for (let i = 0; i < vecSep.length; i++) {
      if(vecSep[i] === 26){
        vecSiNo.push('SI');
      }else{
        vecSiNo.push('NO');
      }
    }
    //Obtenemos la longitud de las oraciones
    let vecLon:number[] =[];
    for (let i = 0; i < this.vecResLim.length; i++) {
      vecLon[i] = this.vecResLim[i].length;
    }
    //Imprimimos resultados
    for (let i = 0; i < vecSiNo.length; i++) {
      console.log(vecSiNo[i] + '    ' + vecLon[i]);
    }
  }
}
