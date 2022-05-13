import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PaisSmall } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ];
  private _baseUrl = 'ttps://restcountries.com/v2';
  //private _baseUrl = 'https://restcountries.com/v3.1/';

  get regiones(): string[] {
    return [ ...this._regiones ];
  };

  constructor( private http: HttpClient ) { };

  getPaisePorregion( region: string ): Observable<PaisSmall[]> {
    const url: string = `${ this._baseUrl }/region/${ region }?fields=alpha3Code,name `;
    return this.http.get<PaisSmall[]>( url )
  }
}
