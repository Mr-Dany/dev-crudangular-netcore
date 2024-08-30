import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent {
  listTarjetas: any[] = [
    { titular: 'juan perez', numeroTarjeta: '25252526262', fechaExpericion: '11/23', cvv: '123' },
    { titular: 'miguel gonzales', numeroTarjeta: '252526262', fechaExpericion: '11/24', cvv: '321' }
  ]

}
