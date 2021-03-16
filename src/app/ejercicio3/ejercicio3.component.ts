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
  datosIngresadosN:string[] = [];
  datosIngresadosD:string[] = [];
  btnOrdenar:boolean = true;
  numeroFrac:boolean = false;
  txtFraccion:boolean = false;
  sumatoriaR:string = '';
  textArea:string = '';

  reiniciar():void{
    this.btnReiniciar = true;
    this.btnAceptar = false;
    this.sumatoriaR = '';
    this.nFracciones = '';
    this.textArea = '';
    this.numeroFrac = false;
    this.datosIngresadosN = [];
    this.datosIngresadosD = [];
    this.resulf1 = '';
    this.resultadof = '';
  }

  resulf!:string;
  resulf1!:string;
  valorf : number =0;
  resultadof:string = '';
  verificar:string = "false";
  

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
      this.txtFraccion = false;
    }
  }

  ordenarFrac():void{
    if(this.datosIngresadosN.length !== this.datosIngresadosD.length){
      alert('Completa todos los datos de las fracciones');
    }else{
      if(this.datosIngresadosN.length < this.nFraccionesNum || this.datosIngresadosD.length < this.nFraccionesNum){
        alert('Completa todos los datos de las fracciones');
      }else{
        let cerosExistentesN:boolean = this.datosIngresadosN.includes('0');
        let cerosExistentesD:boolean = this.datosIngresadosD.includes('0');
        if(cerosExistentesN === true){
          alert('No se pueden ingresar numeradores con 0');
        }else if(cerosExistentesD === true){
          alert('No se pueden ingresar denominadores con 0');
        }else{
          this.txtFraccion = true;
          this.btnOrdenar = true;
          this.btnReiniciar = false;
          //Empezamos la ordenacion
          this.valorf = 1;
          this.verificar ="true";
          let datos3:string[]=[];
          let j: number = 0;
          let arrFraccion: Operacion[] = [];
          while(j  <= (this.datosIngresadosN.length-1)){
            datos3[j] = this.datosIngresadosN[j]+"/"+this.datosIngresadosD[j];
            let op:Operacion = new Operacion(datos3[j]);
            arrFraccion.push(op);
            j++;
          }
          let result:Operacion[] =this.ordenar(arrFraccion).reverse();
          result.forEach(element => {
            this.resultadof = this.resultadof+element.fracciones + "\n";
          });
         
          let x:Operacion[] = this.sumarFracciones(result);
          x.forEach(element => {
           this.resulf1 = element.fracciones.toString();
          });
          let resultadoSimplificado:string = this.simplificar(x[0].fracciones);
         
         //Imprimimosresultados
          this.textArea = this.resultadof;
          this.sumatoriaR = resultadoSimplificado;
        }
       
      }
    }
    
  }

  ordenar(objeto:Operacion[]) :Operacion[]{
    let vector:number[]=[];
    objeto.forEach(element => {
      vector.push(element.valor)
    });
    if(vector.length<1){
    return [];
    }
    let n:number = vector.length; 
    let pos:number = Math.floor(Math.random() * ((n-1) - 0 + 1) + 0);
    let pivote:number =vector[pos];
    let pivoteObjeto!:Operacion;
    pivoteObjeto =objeto[pos];
    vector.splice(pos,1); 
    objeto.splice(pos,1); 
  
    let menores: Operacion[]=[]; 
    let mayores: Operacion[]=[]; 
  
    objeto.forEach(element => {
       if  (element.valor<pivote){
        menores.push(element)
       }else{
        mayores.push(element)
       }         
    });
   return this.ordenar(menores).concat(pivoteObjeto).concat(this.ordenar(mayores));
  }

  sumarFracciones(cadena: Operacion[] ):Operacion[]{

    let longitud:number = cadena.length; 
    if(longitud==1){
        return cadena;
  
    }
    let f1:string =cadena[longitud-1].fracciones; 
    let f2:string =cadena[longitud-2].fracciones;
    var fraccion1 = f1.split("/"); 
    var n1=parseInt(fraccion1[0]);
    var d1=parseInt(fraccion1[1]);
    var fraccion2 = f2.split("/"); 
    var n2=parseInt(fraccion2[0]);
    var d2=parseInt(fraccion2[1]);
    cadena.pop();
    cadena.pop();
    if(d1==d2){
        let nf:number = n1+n2; 
        let df: number = d1;
        let fraccionNueva: string = nf+"/"+df;
        let opNueva: Operacion = new Operacion(fraccionNueva);
        cadena.push(opNueva); 
        return this.sumarFracciones(cadena); 
    }else{
        let df: number = d1*d2;
        let nx = (df/d1);
        let a1= nx*n1; 
        let ny = (df/d2);
        let a2= ny*n2;
        let a = a1+a2;   
        let fraccionNueva: string = a+"/"+df;   
       let simple: string = this.simplificar(fraccionNueva);
        var  auxiliar = simple.split("/");
        var n = auxiliar[0];
        var d=auxiliar[1];
        let fraccionNuevaSimplificada:string = n+"/"+d;
        let opNueva: Operacion = new Operacion(fraccionNuevaSimplificada);
        cadena.push(opNueva); 
        return this.sumarFracciones(cadena) 
    }
  }

  simplificar(fraccion:string) :string{
    let cadena:string[] = fraccion.split("/");
    let numerador:number =parseInt(cadena[0]);
    let denominador:number =parseInt(cadena[1]);
    if(Math.abs(numerador)>Math.abs(denominador)){ 
       let limite:number = Math.abs(denominador);  
        for (let index = 2; index <= limite; index++) {
  
           if(numerador%index==0      &&  denominador%index==0   ){
               var d = denominador/index;
               var n = numerador/index;
                let nuevo:string= n+"/"+d;
                return this.simplificar(nuevo); 
           }   
        }
    }
    if(Math.abs(numerador)==Math.abs(denominador)){
        return "1/1";
    }
    if(Math.abs(denominador)>Math.abs(numerador)){
        let limite:number = Math.abs(numerador);
  
        for (let index = 2; index <= limite; index++) {
  
           if(numerador%index==0      &&  denominador%index==0   ){
               var d = denominador/index;
               var n = numerador/index;
                let nuevo:string= n+"/"+d;
                return this.simplificar(nuevo);
           }   
        }
    }
    return fraccion;
  }
}

class Operacion{
  public fracciones:string="";
  public valor:number;
  constructor (fraccion:string){
      this.fracciones=fraccion;
      this.valor=this.obtenerFraccion(fraccion);
  }
  public obtenerFraccion(fraccion:string):number {
      var auxString = fraccion.split("/");
      let aux:number[] = [];
      aux[0]=parseInt(auxString[0]);
      aux[1]=parseInt(auxString[1]);

      if(aux.length==2){
          return aux[0]/aux[1];
      }else{
        return 0;
      }
  }
}
