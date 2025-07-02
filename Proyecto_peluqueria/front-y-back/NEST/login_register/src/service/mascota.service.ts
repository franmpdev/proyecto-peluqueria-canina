import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';
import { MascotaDatosDto } from 'src/dto/MascotaDatosDto';
import { Cita } from 'src/model/Cita';
import { Mascota } from 'src/model/Mascota';
import { Repository } from 'typeorm';

@Injectable()
export class MascotaService {

  constructor(
    @InjectRepository(Mascota) private repositoryMascota: Repository<Mascota>,
    @InjectRepository(Cita) private repsositoryCita: Repository<Cita>
  ){}

  // BUSCAR MASCOTA

  async getMascotaPorId(id: number): Promise<MascotaDatosDto> {
    const mascota = await this.repositoryMascota.findOne({
      where: { id_mascota: id },
      relations: ['cliente', 'citas'],
    });

    if (!mascota) {
      return null;
    }

    return new MascotaDatosDto(
      mascota.id_mascota,
      mascota.cliente,
      mascota.citas,
      mascota.nombre,
      mascota.raza,
      mascota.edad,
    );
  }
  
  //BUSCAR MASCOTAS POR EMAIL DE CLIENTE
  async getMascotasPorEmail(email: string): Promise<MascotaDatosDto[]> {
    const mascotas = this.repositoryMascota.find({ where: { email_cliente:email },
    relations: ['cliente', 'citas'] });
    const mascotasDto: MascotaDatosDto[] = (await mascotas).map(mascota => new MascotaDatosDto(
      mascota.id_mascota,
      mascota.cliente,
      mascota.citas,
      mascota.nombre,
      mascota.raza,
      mascota.edad,
    ));
    return mascotasDto;
  }
  //BUSCAR MASCOTA POR EMAIL DE CLIENTE Y NOMBRE
  async findMascotaByEmailAndName(email: string, nombre: string): Promise<MascotaDatosDto | false> {
    const mascota = await this.repositoryMascota.findOne({ where: { email_cliente:email, nombre:nombre },
    relations: ['cliente', 'citas'] });
    if(mascota){
      return new MascotaDatosDto(
        mascota.id_mascota,
        mascota.cliente,
        mascota.citas,
        mascota.nombre,
        mascota.raza,
        mascota.edad
      )
    }else{
      return false;
    }
    
  }

  //ALTA MASCOTA

  async highAnimals(dto: MascotaAltaDto): Promise<MascotaDatosDto | false> {
    // Comprueba si ya existe una mascota con los mismos datos
    const existente = await this.repositoryMascota.findOne({
      where: {
        email_cliente: dto.email_cliente,
        nombre: dto.nombre,
        raza: dto.raza,
      },
    });

    if (existente) {
      return false;
    }

    // Crea y guarda la nueva mascota
    const nueva = this.repositoryMascota.create({
      email_cliente: dto.email_cliente,
      nombre: dto.nombre,
      raza: dto.raza,
      edad: dto.edad,
    });
    const guardada = await this.repositoryMascota.save(nueva);

    // Devuelve un DTO con los datos de la mascota creada
    return new MascotaDatosDto(
      guardada.id_mascota,
      guardada.cliente,
      guardada.citas,
      guardada.nombre,
      guardada.raza,
      guardada.edad,
    );
  }


  //BAJA MASCOTA

  async deleteAnimal(id: number): Promise<boolean> {
    const mascota = await this.repositoryMascota
      .createQueryBuilder('mascota')
      .leftJoinAndSelect('mascota.citas', 'cita')
      .where('mascota.id_mascota = :id', { id })
      .getOne();

    if (mascota) {
      await this.repositoryMascota.delete(mascota.id_mascota);
      return true;
    } else {
      return false;
    }
  }


  //MODIFICAR MASCOTA

  async modifyAnimals(id:number, mascota: MascotaAltaDto):Promise<boolean>{
    const result = await this.repositoryMascota.createQueryBuilder()
      .update(Mascota)
      .set({ ...mascota })
      .where("id_mascota = :id", { id:id })
      .execute()
    return result.affected && result.affected > 0;
  }

}
