import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicio2',
  templateUrl: './ejercicio2.component.html',
  styleUrls: ['./ejercicio2.component.css']
})
export class Ejercicio2Component implements OnInit {

  l:string[] = [];
  claveIngresada:string = '';
  mensajeIngresado:string ='';
  mensajeCifrado:string='';
  mensajeDescifrado:string='';
  bloquearLetras:boolean = false;
  claveMensaje:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  abecedario:string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
  letrasAleatorias():void{
    this.bloquearLetras = false;
    this.claveMensaje = true;
    let abecedarioDesordenado:string[] = [];
    let vecNumRan:number[] = [];
    let i:number = 0;
    while(i < 26){
      let nAleatorio:number = Math.ceil(Math.random()*26);
      let exis:boolean = false;
        if(i === 0){
          vecNumRan.push(nAleatorio);
          i = i + 1;
        }else{
          for (let i = 0; i < vecNumRan.length; i++) {
            if(nAleatorio === vecNumRan[i]){
              exis = true;
              break;
            }
          }
          if(exis === false){
            vecNumRan.push(nAleatorio);
            i = i + 1;
          }
        }
    }
    for (let i = 0; i < vecNumRan.length; i++) {
      vecNumRan[i] = vecNumRan[i] - 1;
    }
    for (let i = 0; i < vecNumRan.length; i++) {
      abecedarioDesordenado.push(this.abecedario[vecNumRan[i]]);
    }
    for (let i = 0; i < abecedarioDesordenado.length; i++) {
      this.l[i] = abecedarioDesordenado[i];
    }
  }

  comprobar():void{
    let vacios:number = 0;
    let letrasIngresadas:string[] = [this.l[0].toUpperCase(), this.l[1].toUpperCase(), this.l[2].toUpperCase(), this.l[3].toUpperCase(), this.l[4].toUpperCase(), this.l[5].toUpperCase(), this.l[6].toUpperCase(), this.l[7].toUpperCase(), this.l[8].toUpperCase(), this.l[9].toUpperCase(), this.l[10].toUpperCase(), this.l[11].toUpperCase(), this.l[12].toUpperCase(), this.l[13].toUpperCase(), this.l[14].toUpperCase(), this.l[15].toUpperCase(), this.l[16].toUpperCase(), this.l[17].toUpperCase(), this.l[18].toUpperCase(), this.l[19].toUpperCase(), this.l[20].toUpperCase(), this.l[21].toUpperCase(), this.l[22].toUpperCase(), this.l[23].toUpperCase(), this.l[24].toUpperCase(), this.l[25].toUpperCase()];
    // Calculamos los espacios vacios
    for (let i = 0; i < letrasIngresadas.length; i++) {
      if(letrasIngresadas[i]===undefined || letrasIngresadas[i]===''){
        vacios = vacios + 1;
      }
    }
    if(vacios > 0){
      alert('Debe ingresar todas las letras del abecedario...');
    }else{
      let lRepetidas:number = this.verificarRepeticion(letrasIngresadas);
      if(lRepetidas > 0){
        alert("No puede ingresar letras repetidas, total de letras repetidas: " + " " + lRepetidas);
        this.claveMensaje = true;
      }else{
        alert("Correcto");
        this.bloquearLetras = true;
        this.claveMensaje = false;
      }
    }
  }

  verificarRepeticion(letrasIngresadas:string[]):number{
    let cont:number = 0;
    let repetidas:boolean = false;
    
    let aux:string;
    for (let i = 0; i < letrasIngresadas.length; i++) {
      aux = letrasIngresadas[i];
      for (let j = i + 1; j < letrasIngresadas.length; j++) {
        if(letrasIngresadas[j] === aux){
          cont = cont + 1;
        }
      }
    }
    if(cont > 0){
      repetidas = true;
    }
    return cont;
  }

  codificar():void{
    let vecLlave:string[]=this.claveIngresada.toString().split(',');
    let mensajeVec:string[] = this.mensajeIngresado.toString().split('');
    let vecLlaveRes:number[] = this.generarVectorLlaveLetras(vecLlave,mensajeVec);
    //Generamos el mensaje cifrado
    //obtenemos las posiciones de las letras en el abecedario
    let posicionesL:number[] =[];
    for (let i = 0; i < mensajeVec.length; i++) {
      for (let j = 0; j < this.abecedario.length; j++) {
        if(mensajeVec[i] === this.abecedario[j]){
          posicionesL.push(j);
        }
      }
    }
    let posConLLaves:number[] = [];
    for (let i = 0; i < posicionesL.length; i++) {
      posConLLaves[i] = posicionesL[i] + vecLlaveRes[i];
    }
    //Comprobamos que los resultados tengan un valor logico es decir menor a 26
    for (let i = 0; i < posConLLaves.length; i++) {
      if(posConLLaves[i] > 25){
        let valor:number = posConLLaves[i];
        let nuevoValor:number = Math.abs(valor - 26);
        posConLLaves[i] = nuevoValor;
      }
    }
    //Ya con las posiciones nuevas procedemos a traer nuestro mensaje codificado
    let resCodificada:string[] = [];
    for (let i = 0; i < mensajeVec.length; i++) {
      resCodificada[i] = this.l[posConLLaves[i]];
    }
    let mensajeC:string = '';
    for (let i = 0; i < resCodificada.length; i++) {
      mensajeC = mensajeC + resCodificada[i];
    }
    this.mensajeCifrado = mensajeC;
  }

  decodificar():void{
    let vecLlave:string[]=this.claveIngresada.toString().split(',');
    let mensajeVec:string[] = this.mensajeIngresado.toString().split('');
    let vecLlaveRes:number[] = this.generarVectorLlaveLetras(vecLlave,mensajeVec);
    //Generamos el mensaje cifrado
    //obtenemos las posiciones de las letras en el abecedario
    let posicionesL:number[] =[];
    for (let i = 0; i < mensajeVec.length; i++) {
      for (let j = 0; j < this.l.length; j++) {
        if(mensajeVec[i] === this.l[j]){
          posicionesL.push(j);
        }
      }
    }
    let posConLLaves:number[] = [];
    for (let i = 0; i < posicionesL.length; i++) {
      posConLLaves[i] = posicionesL[i] - vecLlaveRes[i];
    }
    //Comprobamos que los resultados tengan un valor logico es decir menor a 26
    for (let i = 0; i < posConLLaves.length; i++) {
      if(posConLLaves[i] < 0){
        let valor:number = posConLLaves[i];
        let nuevoValor:number = Math.abs(valor + 26);
        posConLLaves[i] = nuevoValor;
      }
    }
    //Ya con las posiciones nuevas procedemos a traer nuestro mensaje codificado
    let resCodificada:string[] = [];
    for (let i = 0; i < mensajeVec.length; i++) {
      resCodificada[i] = this.abecedario[posConLLaves[i]];
    }
    let mensajeC:string = '';
    for (let i = 0; i < resCodificada.length; i++) {
      mensajeC = mensajeC + resCodificada[i];
    }
    this.mensajeDescifrado = mensajeC;
  }

  generarVectorLlaveLetras(vecLlave:string[], vecMensaje:string[]):number[]{
    let vecResultado:number[] = [];
    let lon:number = vecLlave.length;
    let con:number = 0;
    for (let i = 0; i < vecMensaje.length; i++) {
      vecResultado.push(Number(vecLlave[con]));
      if(con === lon-1){
        con = 0;
      }else{
        con++;
      }
    }
    return vecResultado;
  }
}
