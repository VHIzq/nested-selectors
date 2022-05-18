import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Pais, PaisSmall } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });
  //llena selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: String[] = [];
  fronteras: PaisSmall[] = []
  //UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesServices: PaisesService) {}

  ngOnInit(): void {
    //recibe cada un ode las regiones
    this.regiones = this.paisesServices.regiones;

    //al cambiar la region
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap(( _ ) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
          //this.miFormulario.get('frontera')?.disable();
        }),
        switchMap((region) => this.paisesServices.getPaisePorregion(region))
        )
        .subscribe((paises) => {
          this.paises = paises;
          this.cargando = false;
      });

      // al cambiar el pais
      this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
          //this.miFormulario.get('frontera')?.enable();
        }),
        switchMap( codigo => this.paisesServices.getPaisPorCodigo( codigo ))
      )
      .subscribe( pais  => {
        this.fronteras = pais?.borders || [];
        this.cargando = false;
      });

  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
