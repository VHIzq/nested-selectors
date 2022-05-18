import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PaisSmall, Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ];
  private _baseUrl = 'https://restcountries.com/v2';
  //private _baseUrl = 'https://restcountries.com/v3.1/';

  get regiones(): string[] {
    return [ ...this._regiones ];
  };

  constructor( private http: HttpClient ) { };

  getPaisePorregion( region: string ): Observable<PaisSmall[]> {
    const url: string = `${ this._baseUrl }/region/${ region }?fields=alpha3Code,name`;
    return this.http.get<PaisSmall[]>( url )
  }

  getPaisPorCodigo( codigo: string ): Observable<Pais | null> {

    if( !codigo ){
      return of( null )
    }
    const url = `${ this._baseUrl }/alpha/${ codigo }`;
    return this.http.get<Pais>( url );
  }

  getPaisPorCodigoSmall( codigo: string ): Observable<PaisSmall> {

    const url = `${ this._baseUrl }/alpha/${ codigo }?fields=name,alpha3Code`;
    return this.http.get<PaisSmall>( url );

    
  }
}
