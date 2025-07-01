import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { ClienteDatosDto } from 'src/dto/ClienteDatosDto';
import { UserAltaDto } from 'src/dto/UserAltaDto';
import { Cliente } from 'src/model/Cliente';
import { Usuario } from 'src/model/Usuario';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  
  constructor(
    @InjectRepository(Cliente) private repositoryCliente: Repository<Cliente>,
    @InjectRepository(Usuario) private repositoryUsuario: Repository<Usuario>
  ){}
  
  // ALTA CLIENTE

    async highClient(nuevo: ClienteAltaDto): Promise<ClienteDatosDto | false> {
    const existente = await this.repositoryCliente.findOne({
      where: { email: nuevo.email }
    });

    if (!existente) {
      const cliente = this.repositoryCliente.create(nuevo);
      await this.repositoryCliente.save(cliente);
      return new ClienteDatosDto(
        cliente.email,
        cliente.nombre,
        cliente.apellido,
        cliente.telefono
      );
    }

    if (!existente.password && nuevo.password) {
      const usuario = this.repositoryUsuario.create(
        new UserAltaDto(nuevo.email, nuevo.password, 'cliente')
      );
      await this.repositoryUsuario.save(usuario);
      // Reutilizamos un método de actualización simple:
      existente.password = nuevo.password;
      const actualizado = await this.repositoryCliente.save(existente);
      return new ClienteDatosDto(
        actualizado.email,
        actualizado.nombre,
        actualizado.apellido,
        actualizado.telefono
      );
    }

    return false;
  }

  //BAJA CLIENTE

  async deleteClient(email:string):Promise<boolean>{
    const cliente :Cliente = await this.repositoryCliente.createQueryBuilder("cliente")
    .where("email=:email", { email:email})
    .getOne();
    
    if(cliente){
      this.repositoryCliente.delete(cliente);
      return true;
    }else{
      return false;
    }
  }
  
  //MODIFICAR CLIENTE

    async modifyClient(email:string, clienteModificado :ClienteAltaDto):Promise<ClienteDatosDto | boolean> {
      //otra alternativa
      const result = await this.repositoryCliente.update({ email: email }, { ...clienteModificado });
      //devolver el cliente actualizado
      if(result.affected > 0) {
        const usuario = await this.repositoryCliente.findOneBy({ email });  
        return new ClienteDatosDto(usuario.email, usuario.nombre, usuario.apellido, usuario.telefono, usuario.password);
      }

    }


    //BUSCAR CLIENTE POR EMAIL Y PASSWORD
  async findClienteByEmail(email: string): Promise<ClienteDatosDto | false> {
    const cliente = await this.repositoryCliente.findOne({
      where: { email },
      relations: ['mascotas', 'citas'],
    });

    if (!cliente) {
      return false;
    }

    return new ClienteDatosDto(
      cliente.email,
      cliente.nombre,
      cliente.apellido,
      cliente.telefono,
      cliente.password,
      cliente.mascotas,
      cliente.citas
    );
  }

  async allClientes(): Promise<ClienteDatosDto[]> {

    const clientes = await this.repositoryCliente.find({
      relations: ['mascotas', 'citas'],
    });

    // 2. Las mapeas a DTOs
    return clientes.map(c => new ClienteDatosDto(
      c.email,
      c.nombre,
      c.apellido,
      c.telefono,
      c.password,    
      c.mascotas,    
      c.citas        
    ));
  }



}
