import { ClienteDatosDto } from "./ClienteDatosDto";
import { EmpleadoAltaDto } from "./EmpeladoAltaDto";
import { MascotaDatosDto } from "./mascotaDatosDto";


export interface CitaDatosDto {
  id_cita: number;
  cliente: ClienteDatosDto;
  empleado: EmpleadoAltaDto;
  mascota: MascotaDatosDto;
  fecha: Date;
  hora: string;

}
