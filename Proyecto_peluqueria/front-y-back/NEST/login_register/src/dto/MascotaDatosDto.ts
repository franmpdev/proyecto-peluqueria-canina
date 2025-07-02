import { Cita } from "src/model/Cita";
import { Cliente } from "src/model/Cliente";
import { Mascota } from "src/model/Mascota";

export class MascotaDatosDto {
  id_mascota: number;
  nombre: string;
  raza: string;
  edad: number;
  cliente: Cliente;
  citas: Cita[];

  constructor(mascota: Mascota) {
    this.id_mascota = mascota.id_mascota;
    this.cliente = mascota.cliente;
    this.citas = mascota.citas;
    this.nombre = mascota.nombre;
    this.raza = mascota.raza;
    this.edad = mascota.edad;
  }
}