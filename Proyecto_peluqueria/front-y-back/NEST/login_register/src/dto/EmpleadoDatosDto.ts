
import { Cita } from "src/model/Cita";
import { Empleado } from "src/model/Empleado";

export class EmpleadoDatosDto {
  dni: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  citas: Cita[];

  constructor(empleado: Empleado) {

      this.dni = empleado.dni;
      this.email = empleado.email;
      this.password = empleado.password;
      this.nombre = empleado.nombre;
      this.apellido = empleado.apellido;
      this.especialidad = empleado.especialidad;
      this.telefono = empleado.telefono;
      this.citas = empleado.citas;
  }
}