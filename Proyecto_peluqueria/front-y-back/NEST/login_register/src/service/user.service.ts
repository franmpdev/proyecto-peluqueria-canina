import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAltaDto } from 'src/dto/UserAltaDto';
import { UserDatosDto } from 'src/dto/UserDatosDto';
import { Usuario } from 'src/model/Usuario';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(@InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>) {}

  async create(user: UserAltaDto): Promise<UserDatosDto> {
    const newUser = this.userRepository.create(user);
    const creado =await this.userRepository.save(newUser);
    return new UserDatosDto(creado.id, creado.email, creado.role);
  }

  async findOne(email: string, password: string): Promise<UserDatosDto | null> {
    const user = await this.userRepository.findOne({ where: { email, password } });
    if (user) {
      return new UserDatosDto(user.id, user.email, user.role);
    }
    return null;
  }
  async update(id: number, user: UserAltaDto): Promise<UserDatosDto> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return new UserDatosDto(updatedUser.id, updatedUser.email, updatedUser.role);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected) > 0;

  }
}
