import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];

  paisesSugeridos : Country[] = []

  constructor( private paisService: PaisService) { }

  buscar( termino:string ){
   
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);
    
    this.paisService.buscarPais( termino )
      .subscribe( 
        {
          next: paises => {
            console.log(paises);
            this.paises = paises;
          },
          
          error: (err) => {
            this.hayError = true;
            this.paises   = [];
          }
            
          
        });  
  }

  sugerencias( termino: string ) {
    this.hayError = false;
    
    this.paisService.buscarPais( termino )
      .subscribe( paises => this.paisesSugeridos = paises.splice(0,3));
  }

}
