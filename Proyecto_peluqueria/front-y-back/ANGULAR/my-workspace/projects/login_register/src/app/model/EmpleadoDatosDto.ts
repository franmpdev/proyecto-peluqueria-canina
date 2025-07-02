import { CitaDatosDto } from "./CitaDatosDto";

export interface EmpleadoDatosDto {
  dni: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  citas: CitaDatosDto[];

}
