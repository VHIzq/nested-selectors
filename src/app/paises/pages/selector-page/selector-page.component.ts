import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required]
  })
  //llena regiones
  regiones: string[] = [];

  constructor(
    private fb: FormBuilder,
    private paisesServices: PaisesService
    ) { }

  ngOnInit(): void {
    //recibe cada un ode las regiones
    this.regiones = this.paisesServices.regiones;

    //al cambiar laregion
    this.miFormulario.get('region')?.valueChanges
      .subscribe( region => {
        console.log(region );
      })
  }

  guardar() {
    console.log( this.miFormulario.value );
  }

}
