import { Component } from '@angular/core';
import { CitaAltaClienteDto } from '../../../../model/CitaAltaClienteDto';
import { CitaService } from '../../../../service/cita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotaService } from '../../../../service/mascota.service';
import { MascotaDatosDto } from '../../../../model/mascotaDatosDto';
import { EmpleadoService } from '../../../../service/empleado.service';
import { EmpleadoDatosDto } from '../../../../model/EmpleadoDatosDto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nueva-cita-cliente',
  templateUrl: './nueva-cita-cliente.component.html',
  styleUrls: ['./nueva-cita-cliente.component.css'],
  imports: [FormsModule, CommonModule]
})
export class NuevaCitaClienteComponent {
  email_cliente: string = '';
  nombre_cliente: string = '';
  telefono_cliente: string = '';
  dni_empleado: string = '';
  id_mascota: number | null = null;
  fecha: string = '';
  hora: string = '';
  mensajeError: string = '';
  mascotas: MascotaDatosDto[] = [];
  empleados: EmpleadoDatosDto[] = [];
  constructor(private router: Router,private empleadoService: EmpleadoService, private citaService: CitaService, private mascotasService: MascotaService) {}
  ngOnInit() {
    const cliente = JSON.parse(localStorage.getItem('cliente'));
    console.log(cliente)
    this.email_cliente = cliente.email;
    this.nombre_cliente = cliente.nombre;
    this.mascotas = cliente.mascotas
    this.empleadoService.allEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }
  onSubmit() {

    const citaDto = new CitaAltaClienteDto(
      this.email_cliente,
      this.dni_empleado,
      this.id_mascota!,
      this.fecha as any,
      this.hora
    );
    citaDto.nombre_cliente = this.nombre_cliente;
    citaDto.telefono_cliente = this.telefono_cliente;
    console.log(citaDto)
    this.citaService.crearCitaCliente(citaDto).subscribe({
      next: () => {
        this.router.navigate(['/mis-citas']);
      },
      error: (error) => {
        this.mensajeError = error.error.message;
      }
    })
  }
}
