import { Cliente } from '../model/Cliente';
import { Empleado } from '../model/Empleado';
import { Cita } from '../model/Cita';
import { Mascota } from 'src/model/Mascota';

export class CitaDatosDto {
  id_cita: number;
  cliente: Cliente;
  empleado: Empleado;
  mascota: Mascota;
  fecha: Date;
  hora: string;

  constructor(cita: Cita) {
    this.id_cita = cita.id_cita;
    this.cliente = cita.cliente;
    this.empleado = cita.empleado;
    this.mascota  = cita.mascota;
    this.fecha = cita.fecha;
    this.hora = cita.hora;
  }
}
