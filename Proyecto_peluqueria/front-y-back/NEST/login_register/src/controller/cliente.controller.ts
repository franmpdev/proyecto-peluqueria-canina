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
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('todos')
  async allCLientes(){
    return await this.clienteService.allClientes();
  }
  @Get('findByEmail/:email')
  async findByEmail(@Param('email') email: string,@Res() res: Response){
    const cliente = await this.clienteService.findClienteByEmail(email);
    if (!cliente) {
      return res
        .status(404)
        .json({ statusCode: 404, message: `Cliente con email "${email}" no encontrado` });
    }
    return res
      .status(200)
      .json(cliente);
  }
  @Post('altaCliente')
  async altaCliente(@Body()cliente:ClienteAltaDto, @Res() res:Response){
    const alta = await this.clienteService.highClient(cliente);
    if(alta){
      return res.status(201).json({
        massage: "Se dio de alta al cliente"
      });
    }else{
      return res.status(404).json({
        massage: "No de dio de alta al cliente"
      });
    }
  }
  @Patch('modificarCliente/:email')
  async modifyCliente(@Param('email')email:string, @Body()cliente:ClienteAltaDto, @Res() res:Response){
    if(await this.clienteService.modifyClient(email,cliente)){
      return res.status(201).json({
        massage: "Se modifico correctamente"
      });
    }else{
      return res.status(404).json({
        massage: "No se pudo modificar correctamente"
      });
    }
  }
}