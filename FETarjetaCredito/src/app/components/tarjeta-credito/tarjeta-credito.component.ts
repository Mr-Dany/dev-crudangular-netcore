import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css',
})
export class TarjetaCreditoComponent {
  //array listTarjetas para mostrar datos de forma estatica
  // en el componente listado de tarjetas
  listTarjetas: any[] = [
    {
      titular: 'juan perez',
      numeroTarjeta: '25252526262',
      fechaExpiracion: '11/23',
      cvv: '123',
    },
    {
      titular: 'miguel gonzales',
      numeroTarjeta: '252526262',
      fechaExiracion: '11/24',
      cvv: '321',
    },
  ];
  //declar formulario e inicializar 
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titular: [''],
      numeroTarjeta: [''],
      fechaExpiracion: [''],
      cvv: [''],
    });
  }
  //funcion que se activa al presionar boton guardar
  //guarda datos que vienen del formulario en la constante Tarjeta
  agregarTarjeta() {
    const Tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };
    this.listTarjetas.push(Tarjeta);
    this.form.reset();
  }
}
