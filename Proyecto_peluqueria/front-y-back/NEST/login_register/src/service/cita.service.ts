import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../model/Cita';
import { CitaDatosDto } from '../dto/CitaDatosDto';
import { CitaAltaClienteDto } from '../dto/CitaAltaClienteDto';
import { CitaAltaEmpleadoDto } from '../dto/CitaAltaEmpleadoDto';
import { CitaAltaDto } from '../dto/CitaAltaDto';
import { ClienteService } from './cliente.service';
import { MascotaService } from './mascota.service';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly repositoryCita: Repository<Cita>,
    private readonly clientesService: ClienteService,
    private readonly mascotasService: MascotaService,
  ) {}

  /** Devuelve todas las citas con relaciones cargadas */
  async findAllCitas(): Promise<CitaDatosDto[]> {
    const citas = await this.repositoryCita.find({
      relations: ['cliente', 'mascota', 'empleado'],
    });
    return citas.map(cita => new CitaDatosDto(cita));
  }

  /** Devuelve citas de un cliente, o vacío si no existen */
  async findQuotesByClient(email: string): Promise<CitaDatosDto[]> {
    const citas = await this.repositoryCita.find({
      where: { email_cliente: email },
      relations: ['cliente', 'mascota', 'empleado'],
    });
    return citas.map(cita => new CitaDatosDto(cita));
  }

  /** Alta de cita por cliente (sin crear cliente/mascota) */
  async highQuoteByClient(dto: CitaAltaClienteDto): Promise<CitaDatosDto | false> {
    const fechaStr = dto.fecha instanceof Date
      ? dto.fecha.toISOString().slice(0,10)
      : dto.fecha;

    const exist = await this.repositoryCita
      .createQueryBuilder('c')
      .where('c.fecha = :fecha AND c.hora = :hora', { fecha: fechaStr, hora: dto.hora })
      .getOne();
    if (exist) return false;

    const nueva = this.repositoryCita.create(dto as CitaAltaDto);
    const creada = await this.repositoryCita.save(nueva);
    const cita = await this.repositoryCita.findOne({
      where: { id_cita: creada.id_cita },
      relations: ['cliente','mascota','empleado'],
    });
    return cita ? new CitaDatosDto(cita) : false;
  }

  /** Alta de cita por empleado (crea cliente y/o mascota si hacen falta) */
  async highQuoteByEmployee(dto: CitaAltaEmpleadoDto): Promise<CitaDatosDto | false> {
    const fechaStr = dto.fecha instanceof Date
      ? dto.fecha.toISOString().slice(0,10)
      : dto.fecha;

    const exist = await this.repositoryCita
      .createQueryBuilder('c')
      .where('c.fecha = :fecha AND c.hora = :hora', { fecha: fechaStr, hora: dto.hora })
      .getOne();
    if (exist) return false;

    // Asegura cliente
    let cliente = await this.clientesService.findClienteByEmail(dto.email_cliente);
    if (!cliente) {
      cliente = await this.clientesService.highClient({
        email: dto.email_cliente,
        nombre: dto.nombre_cliente,
        apellido: dto.apellido_cliente,
        telefono: dto.telefono_cliente,
      });
    }
    if (!cliente) return false;

    // Asegura mascota
    let mascota = await this.mascotasService.findMascotaByEmailAndName(dto.email_cliente, dto.nombre_mascota);
    if (mascota) {
      mascota = await this.mascotasService.highAnimals(new MascotaAltaDto(
        dto.email_cliente,
        dto.nombre_mascota,
        dto.raza,
        dto.edad));
    }
    if (!mascota) return false;

    // Crea cita
      const nueva = this.repositoryCita.create({
      email_cliente: dto.email_cliente,
      dni_empleado: dto.dni_empleado,
      id_mascota: mascota.id_mascota,  // <-- aquí, antes faltaba la propiedad
      fecha: dto.fecha,
      hora: dto.hora,
    });
    const creada = await this.repositoryCita.save(nueva);

    // Devuelve con relaciones cargadas
    const cita = await this.repositoryCita.findOne({
      where: { id_cita: creada.id_cita },
      relations: ['cliente','mascota','empleado'],
    });
    return cita ? new CitaDatosDto(cita) : false;
  }

  /** Modifica una cita (devuelve true si tuvo efecto) */
  async modifyQuote(id: number, dto: CitaAltaDto): Promise<boolean> {
    const result = await this.repositoryCita
      .createQueryBuilder()
      .update(Cita)
      .set(dto)
      .where('id_cita = :id', { id })
      .execute();
    return (result.affected ?? 0) > 0;
  }

  /** Elimina una cita por ID */
  async deleteQuote(id: number): Promise<boolean> {
    const result = await this.repositoryCita.delete(id);
    return (result.affected ?? 0) > 0;
  }
}