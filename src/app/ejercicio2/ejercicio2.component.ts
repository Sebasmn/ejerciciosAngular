import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ejercicio2',
  templateUrl: './ejercicio2.component.html',
  styleUrls: ['./ejercicio2.component.css']
})
export class Ejercicio2Component implements OnInit {

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
  }

  public requestLease(): void {
    this.http.get('../assets/docs/MULTIPLICACION.txt', { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      });
  }
  
}
