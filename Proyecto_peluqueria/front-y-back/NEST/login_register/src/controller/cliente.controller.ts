import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { ClienteService } from 'src/service/cliente.service';
import { Response } from 'express';
import { ClienteDatosDto } from 'src/dto/ClienteDatosDto';
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('todos')
  async allCLientes(){
    return await this.clienteService.allClientes();
  }
  @Get(':email')
  async findOne(@Param('email') email: string, @Res() res: Response):Promise<Response> {
    var cliente: ClienteDatosDto|boolean = await this.clienteService.findClienteByEmail(email);
    //comprobar que el cliente es Cliente
    if (cliente) {
      return res.status(200).json(cliente);
    }
    return res.status(404).json({ message: 'Cuenta no encontrada' })
  }


  @Post('create')
  async create(@Body() cliente: ClienteAltaDto, @Res() res: Response):Promise<Response> {
    const creado = await this.clienteService.highClient(cliente);
    if(creado){
      return res.status(201).json(creado)
    }else{
      return res.status(500).json(
      {
        message: 'El usuario ya existe',
      });
    };
  }
  @Patch('modificarCliente/:email')
  async modifyCliente(@Param('email')email:string, @Body()cliente:ClienteAltaDto, @Res() res:Response){
    const clientemodificado = await this.clienteService.modifyClient(email, cliente);
    if(clientemodificado){
      return res.status(201).json({
        massage: "Se modifico correctamente",
        cliente: clientemodificado
      });
    }else{
      return res.status(404).json({
        massage: "No se pudo modificar correctamente"
      });
    }
  }
  @Delete('eliminarCliente/:email')
  async deleteCliente(@Param('email') email: string, @Res() res: Response):Promise<Response> {
    const delet = await this.clienteService.deleteClient(email);
    if (delet) {
      return res.status(200).json({
        message: "Has eliminado al cliente"
      });
    } else {
      return res.status(404).json({
        message: "No se ha encontrado al cliente"
      });
    }
  }

}