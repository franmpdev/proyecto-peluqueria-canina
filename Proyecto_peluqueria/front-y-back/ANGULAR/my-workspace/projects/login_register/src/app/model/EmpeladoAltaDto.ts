export class EmpleadoAltaDto {
  dni: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  constructor(dni?: string, email?: string, password?: string, nombre?: string, apellido?: string, especialidad?: string, telefono?: string) {
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especialidad = especialidad;
    this.telefono = telefono;
  }
}
