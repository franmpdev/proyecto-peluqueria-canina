import { IsEmail, IsInt, IsString, IsStrongPassword, Length } from "class-validator";
import { Cita } from "src/model/Cita";
import { Cliente } from "src/model/Cliente";
import { Mascota } from "src/model/Mascota";

export class ClienteDatosDto {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  password: string;
  mascotas: Mascota[];
  citas: Cita[];


  constructor(cliente: Cliente) {
    this.email = cliente.email;
    this.nombre = cliente.nombre;
    this.apellido = cliente.apellido;
    this.telefono = cliente.telefono;
    this.mascotas = cliente.mascotas;
    this.citas = cliente.citas;
  
  }
}