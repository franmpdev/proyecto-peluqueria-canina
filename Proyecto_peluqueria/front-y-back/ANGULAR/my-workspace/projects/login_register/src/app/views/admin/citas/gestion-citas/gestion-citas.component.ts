import { Component } from '@angular/core';
import { CitaService } from '../../../../service/cita.service';
import { EmpleadoService } from '../../../../service/empleado.service';
import { CitaDatosDto } from '../../../../model/CitaDatosDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gestion-citas',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.css']
})
export class GestionCitasComponent {
  citas: CitaDatosDto[] = [];
  empleados: any[] = []; // Puedes definir un tipo más específico si lo deseas
  constructor(private citasService: CitaService, private empleadosService: EmpleadoService) {}
  ngOnInit() {
    this.citasService.obtenerCitas().subscribe({
      next: (citas) => {
        this.citas = citas;
        this.empleadosService.allEmpleados().subscribe({
          next: (empleados) => {
            this.empleados = empleados;
            this.asignarEmpleado()
          },
          error: () => {
          }
        });
      },
      error: () => {
      }
    });

  }
  eliminarCita(id: number) {
    this.citasService.eliminarCita(id).subscribe({
      next: () => {
        // Actualizar la lista de citas después de eliminar
        this.citas = this.citas.filter(cita => cita.id_cita !== id);
      },
      error: (error) => {
      }
    });
  }
  asignarEmpleado() {
    this.citas.forEach(cita => {
      const empleado = this.empleados.find(e => e.dni == cita.dni_empleado);
      if (empleado) {
        cita.nombre_empleado = empleado.nombre;
        cita.apellido_empleado = empleado.apellido;
      } else {
        cita.nombre_empleado = '';
        cita.apellido_empleado = '';
      }
    });
  }
}
