import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicio3',
  templateUrl: './ejercicio3.component.html',
  styleUrls: ['./ejercicio3.component.css']
})
export class Ejercicio3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  btnAceptar:boolean = false;
  btnReiniciar:boolean = true;
  textAreaH:boolean = true;
  resSumatoria:boolean = true;
  cantidad:string = '';
  nFracciones:string = '';
  presionado:boolean = false;
  nFraccionesNum :number = 0;
  ingresados!:string[];
  datosIngresados:string[] = [];
  btnOrdenar:boolean = true;
  numeroFrac:boolean = false;
  reiniciar():void{

  }

  comprobar():void{
    if(this.nFracciones==='' || this.nFracciones.length === 0){
      alert('Debes ingresar el número de fracciones que deseas ordenar');
    }else{
      this.nFraccionesNum = Number(this.nFracciones);
      this.ingresados = new Array(this.nFraccionesNum);
      this.presionado = true;
      this.btnOrdenar = false;
      this.btnAceptar = true;
      this.numeroFrac = true;
    }
  }

  ordenar():void{

  }
}