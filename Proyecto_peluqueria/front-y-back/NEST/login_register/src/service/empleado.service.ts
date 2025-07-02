import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empleado } from 'src/model/Empleado';
import { Usuario } from 'src/model/Usuario';
import { EmpleadoDatosDto } from 'src/dto/EmpleadoDatosDto';
import { UserAltaDto } from 'src/dto/UserAltaDto';
import { EmpleadoAltaDto } from 'src/dto/EmpeladoAltaDto';

@Injectable()
export class EmpleadoService {

  constructor(
    @InjectRepository(Empleado)
    private readonly repositoryEmpleado: Repository<Empleado>,
    @InjectRepository(Usuario)
    private readonly repositoryUsuario: Repository<Usuario>,
  ) {}

  /**
   * Devuelve todos los empleados junto a sus citas
   */
  async allEmployees(): Promise<EmpleadoDatosDto[]> {
    const empleados = await this.repositoryEmpleado.find({ relations: ['citas'] });
    return empleados.map(emp => new EmpleadoDatosDto(emp));
  }

  /**
   * Crea un nuevo empleado y usuario, si no existe
   */
  async highEmployee(dto: EmpleadoAltaDto): Promise<EmpleadoDatosDto | false> {
    const existing = await this.repositoryEmpleado.findOne({ where: { dni: dto.dni } });
    if (existing) return false;

    const empleado = this.repositoryEmpleado.create(dto);
    const saved = await this.repositoryEmpleado.save(empleado);

    // Crear usuario asociado
    const userDto = new UserAltaDto(dto.email, dto.password, 'empleado');
    const userEntity = this.repositoryUsuario.create(userDto);
    await this.repositoryUsuario.save(userEntity);

    // Recargar con relaciones
    const empWithRelations = await this.repositoryEmpleado.findOne({ 
      where: { dni: saved.dni },
      relations: ['citas'],
    });
    return empWithRelations ? new EmpleadoDatosDto(empWithRelations) : false;
  }

  /**
   * Elimina un empleado y su usuario
   */
  async deleteEmployee(dni: string): Promise<boolean> {
    const result = await this.repositoryEmpleado.delete(dni);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Modifica datos de un empleado
   */
  async modifyEmployee(dni: string, dto: EmpleadoAltaDto): Promise<boolean> {
    const result = await this.repositoryEmpleado.update(dni, dto);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Busca un empleado por DNI, lanzando 404 si no existe
   */
  async findEmpleadoByDni(dni: string): Promise<EmpleadoDatosDto | false> {
    const emp = await this.repositoryEmpleado.findOne({ 
      where: { dni },
      relations: ['citas'],
    });
    if (!emp){
      return false;
    }
    return new EmpleadoDatosDto(emp);
  }

  /**
   * Busca un empleado por email, lanzando 404 si no existe
   */
  async findEmployeeByEmail(email: string): Promise<EmpleadoDatosDto | false> {
    const emp = await this.repositoryEmpleado.findOne({ 
      where: { email },
      relations: ['citas'],
    });
    if (!emp){
      return false;
    }
    return new EmpleadoDatosDto(emp);
  }
}
