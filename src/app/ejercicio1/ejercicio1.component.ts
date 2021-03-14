import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicio1',
  templateUrl: './ejercicio1.component.html',
  styleUrls: ['./ejercicio1.component.css']
})
export class Ejercicio1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   //obtenemos el numerador y denominador
   numerador!:number;
   denominador!:number;
   dividir():void {
     //transformamos en vectores el n y d
   let vecNum!:string[];
   let vecDen!:string[];
   let vecAux:string[] = [];
     // asignamos ambos valores al vector
     vecNum = this.numerador.toString().split('');
     vecDen = this.denominador.toString().split('');
     
     if(this.numerador !== this.denominador){
       if(vecNum.length > vecDen.length){
         console.log('n > d');
         let fin:boolean = true;
         let i:number = 0;
         let vecAux:string[] = [];
         let vecSobrante:string[] = [];
         let vecNumRes:number[] = []; //almacenan las respuestas del num imprimir en el textarea
         let vecResDen:number[] = []; //almacenan las respuestas del den imprimir en el textarea
         let vecCadena:string;
         let numCadena:number;
         let ultimoRes:number;
         if(this.numerador%this.denominador === 0){
           let respuDe:number = this.numerador / this.denominador;
           vecResDen.push(respuDe);
           vecNumRes.push(0);
           fin=false;
           //Impresion para verificar
           for (let i = 0; i < vecNumRes.length; i++) {
             console.log(vecNumRes[i]);
             console.log(vecResDen[i]);
           }
         }
         while(fin === true){
           if(i === 0){
             for (let k = 0; k < vecDen.length; k++) {
               vecAux.push(vecNum[k]);
             }
             for (let l = vecDen.length; l < vecNum.length; l++) {
               vecSobrante.push(vecNum[l]);
             }
             //Convertimos a cadena el nuevo numerador
             vecCadena = this.convertirVectorCadena(vecAux);
             numCadena = +vecCadena;
             let comMul:number;
             if(numCadena > this.denominador){
               let cont:number = 0;
               let numAux:number = 0;
               let vecRes:number[] = [];
               for (let i = 1; i < 100; i++) {
                 comMul = this.denominador * i;  
                 if(comMul < numCadena){
                   vecRes.push(comMul);
                 }        
                 if(comMul > numCadena) {
                   numAux = i - 1;
                   vecResDen.push(numAux);
                   break;
                 } 
                 cont++;
               }
               let resultadoResta:number =  Math.abs(numCadena - vecRes[numAux-1]);
               vecNumRes.push(resultadoResta);
               ultimoRes = resultadoResta;
                for (let i = 0; i < vecNumRes.length; i++) {
                  console.log('Respuesta numerador: ' + vecNumRes);
                  console.log('Respuesta denominador: ' + vecResDen);
                }
               // console.log(ultimoRes);
             }
             if(numCadena < this.denominador)
             {              
               console.log('entro aqui');
               let primerNSo:string = vecSobrante[0];
               let nCadena:string = numCadena + primerNSo;
               let nCadenaNumero:number = +nCadena;
               let vecAuxSobrante:string[] =[];
               for (let i = 1; i < vecSobrante.length; i++) {
                 vecAuxSobrante.push(vecSobrante[i]);
               }
               vecSobrante = vecAuxSobrante;
               let numAux:number = 0;
               let vecRes:number[] = [];
               let igual:boolean = false;
               for (let i = 1; i < 100; i++) {
                 comMul = this.denominador * i;  
                 if(comMul === nCadenaNumero){
                   igual = true;
                 }
                 if(comMul < nCadenaNumero){
                   vecRes.push(comMul);
                 }        
                 if(comMul > nCadenaNumero) {
                   numAux = i - 1;
                   vecResDen.push(numAux);
                   break;
                 } 
               }
               if(igual === true){
                 console.log('Es igual entra aqui');
                 let resultadoResta:number =  0;
                 vecNumRes.push(resultadoResta);
                 ultimoRes = resultadoResta;
                 //Impresion para verificar
                 for (let i = 0; i < vecNumRes.length; i++) {
                   console.log(vecNumRes[i]);
                   console.log(vecResDen[i]);
                 }
                 console.log(resultadoResta + ' ' + ultimoRes);
               }else{
                 let resultadoResta:number =  Math.abs(nCadenaNumero - vecRes[numAux-1]);
                 vecNumRes.push(resultadoResta);
                 ultimoRes = resultadoResta;
                 //Impresion para verificar
                 for (let i = 0; i < vecNumRes.length; i++) {
                   console.log(vecNumRes[i]);
                   console.log(vecResDen[i]);
                 }
                 console.log(resultadoResta + ' ' + ultimoRes);
               }
              
                
             }
             if(numCadena === this.denominador){
               vecResDen.push(1);
               vecNumRes.push(0);
             }
           }
           if(i > 0){
             //aqui me quede
             fin = false;
           }
           i++;
         }
       } 
       if(vecNum.length < vecDen.length){
         console.log('n < d');
       }
     }else{
       console.log('El resultado es 1');
     }
    
   }
 
   convertirVectorCadena(vecAux:string[]):string{
     let cadenaNum:string = '';
     for (let index = 0; index < vecAux.length; index++) {
       if(index === 0){
         cadenaNum = vecAux[0];
       }else{
         cadenaNum = cadenaNum + vecAux[index];
       }
     }
     return cadenaNum;
   }
   
}
