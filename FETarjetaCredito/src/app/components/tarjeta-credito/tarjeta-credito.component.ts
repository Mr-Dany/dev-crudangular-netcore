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
  accion = 'Agregar';
  id: number | undefined;
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
    //usamos el servicio de obtener tarjeta y mostramos los datos
    this._tarjetaService.getListTarjetas().subscribe({
      next: (data) => {
        console.log('Next:', data);
        // Procesar datos
        this.listTarjetas = data;
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
  guardarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if (this.id == undefined) {
      //usamos el servicio de guardar tarjeta y enviamos la tarjeta y mostramos error o succeso
      this._tarjetaService.saveTarjeta(tarjeta).subscribe({
        next: (data) => {
          console.log('Next:', data);
          // Procesar datos
          this.toastr.success(
            'La tarjeta fue registrada con exito!',
            'Tarjeta Registrada!'
          );
        },
        error: (error) => {
          console.error('Error:', error);
          // Manejar error
          this.toastr.error(
            'Opss... La tarjeta no ha sido registrada!',
            'Tarjeta NO Registrada!'
          );
        },
        complete: () => {
          console.log('Complete');
          // Acciones al completar
          this.obtenerTarjetas();
          this.form.reset();
        },
      });
      //this.listTarjetas.push(tarjeta);
    } else {
      //actualizar tarjeta
      tarjeta.id = this.id;
      //usamos el servicio de guardar tarjeta y enviamos la tarjeta y mostramos error o succeso
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe({
        next: (data) => {
          console.log('Next:', data);
          // Procesar datos
          this.toastr.info(
            'La tarjeta fue actualizada con exito!',
            'Tarjeta Actualizada!'
          );
        },
        error: (error) => {
          console.error('Error:', error);
          // Manejar error
          this.toastr.error(
            'Opss... La tarjeta no ha sido actualizada!',
            'Tarjeta NO Actualizada!'
          );
        },
        complete: () => {
          console.log('Complete');
          // Acciones al completar
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.obtenerTarjetas();
        },
      });
    }
  }

  //metodo pra eliminar una tarjeta mediante el id
  eliminarTarjeta(id: number) {
    //usamos el servicio de eliminar tarjeta y enviamos el ID y mostramos error o succeso
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
        this.toastr.error(
          'Opsss... La tarjeta no ha sido eliminada!',
          'Tarjeta NO Eliminada!'
        );
      },
      complete: () => {
        console.log('Complete');
        // Acciones al completar
        this.obtenerTarjetas();
      },
    });
    //this.listTarjetas.splice(index, 1);
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    });
  }
}
