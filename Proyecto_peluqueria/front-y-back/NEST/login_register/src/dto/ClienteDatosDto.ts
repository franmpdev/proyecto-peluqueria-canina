import { IsEmail, IsInt, IsString, IsStrongPassword, Length } from "class-validator";
import { Cita } from "src/model/Cita";
import { Mascota } from "src/model/Mascota";

export class ClienteDatosDto {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  password: string;
  mascotas: Mascota[];
  citas: Cita[];


  constructor(email: string, nombre: string, apellido: string, telefono: string, mascotas?: Mascota[], citas?: Cita[]) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.mascotas = mascotas;
    this.citas = citas;
  
  }
}