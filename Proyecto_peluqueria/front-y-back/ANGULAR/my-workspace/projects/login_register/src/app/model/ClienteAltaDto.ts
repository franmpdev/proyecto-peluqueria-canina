export class ClienteAltaDto {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  constructor(email: string, telefono: string, nombre: string, apellido?: string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
  }
}
