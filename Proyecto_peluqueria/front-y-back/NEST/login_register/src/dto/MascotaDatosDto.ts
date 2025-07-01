import { Cita } from "src/model/Cita";
import { Cliente } from "src/model/Cliente";

export class MascotaDatosDto {
  id_mascota?: number;
  nombre: string;
  raza: string;
  edad: number;
  cliente: Cliente;
  citas: Cita[];

  constructor(id_mascota: number, cliente: Cliente, citas: Cita[], nombre: string, raza: string, edad: number) {
    this.id_mascota = id_mascota;
    this.cliente = cliente;
    this.citas = citas;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
  }
}