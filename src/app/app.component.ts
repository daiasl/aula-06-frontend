import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  marcas: any=[];
  veiculos: any=[];
  modelo: any=[];
  
  constructor (protected readonly http: HttpClient){
    this.main()
  }
  async main(){
    //promise
    this.marcas= await this.http
      .get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
      .toPromise();
    console.log(this.marcas, 'Marcas');

    //filtra pela marca.
    const volkswagen = this.marcas.filter((mar: any)=> mar.name === 'VOLKSWAGEN')[0];
    console.log(volkswagen);

    this.veiculos = await this.http
      .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${volkswagen.id}.json`)
      .toPromise()
    console.log(this.veiculos, 'Veiculos');

    this.modelo =this.veiculos.filter((vei: any)=> vei.name === 'AMAROK Trendline CD 2.0 TDI 4X4 Dies Aut');
    console.log (this.modelo, 'Modelo');

    
    


  }

}
