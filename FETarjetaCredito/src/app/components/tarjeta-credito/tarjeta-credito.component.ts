import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

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
  listTarjetas: any[] = [];
  //declar formulario e inicializar
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.pattern('[0-9]{16}'),
        ],
      ],
      fechaExpiracion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('[0-9 /]{5}'),
        ],
      ],
      cvv: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[0-9]{3}'),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }
  //metodo para obtener tarjetas usando el servicio getListTarjetas
  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe({
      next: (data) => {
        console.log('Next:', data);
        // Procesar datos
        this.listTarjetas = data
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejar error
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
      },
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
    this.toastr.success(
      'La tarjeta fue registrada con exito!',
      'Tarjeta Registrada!'
    );
    this.form.reset();
  }

  //metodo pra eliminar una tarjeta mediante el id 
  eliminarTarjeta(id: number) {
    //this.listTarjetas.splice(index, 1);
    this._tarjetaService.deleteTarjeta(id).subscribe({
      next: (data) => {
        //console.log('Next:', data);
        // Procesar datos
        //this.listTarjetas = data
        this.toastr.success(
          'La tarjeta fue eliminada con exito!',
          'Tarjeta Eliminada!'
        );
      },
      error: (error) => {
        console.error('Error:', error);
        // Manejar error
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
        this.obtenerTarjetas();
      },
    });
  }
}
