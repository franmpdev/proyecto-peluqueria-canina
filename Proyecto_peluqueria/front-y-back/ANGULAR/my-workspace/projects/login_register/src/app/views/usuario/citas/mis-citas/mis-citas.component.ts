import { ErrorResponse } from './../../../../model/ErrorResponse';
import { Component } from '@angular/core';
import { CitaService } from '../../../../service/cita.service';
import { CitaDatosDto } from '../../../../model/CitaDatosDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MisCitasComponent  {
  citas: CitaDatosDto[] = [];
  mensaje: string = 'Todavia no tienes citas';
  mensajeEliminar: string = '';
  constructor(private citasService: CitaService) { }
  ngOnInit() {
    let email = JSON.parse(localStorage.getItem('cliente')).email;
    this.citasService.getMisCitas(email).subscribe({
      next: (citas) => {
        this.citas = citas;
      },
      error: ({error}) => {
        this.mensaje = error.message;
      }
    });
  }
  eliminarCita(id: number) {
    this.citasService.eliminarCita(id).subscribe({
      next: () => {
        this.citas = this.citas.filter(c => c.id_cita !== id);
        this.mensajeEliminar='Cita eliminada';
        setTimeout(() => {
          this.mensajeEliminar = '';
        }, 2000);
      },
      error: (error) => {
        this.mensaje = error.error.message;
      }
    });
  }
}
