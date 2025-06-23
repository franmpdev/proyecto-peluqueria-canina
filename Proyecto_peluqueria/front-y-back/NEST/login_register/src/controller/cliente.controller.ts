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
  @Post('altaCliente')
  async altaCliente(@Body()cliente:ClienteAltaDto, @Res() res:Response){
    const alta = await this.clienteService.highClient(cliente);
    if(alta){
      return res.status(201).json({
        massage: "Se dio de alta al cliente"
      });
    }else{
      return res.status(499).json({
        massage: "No de dio de alta al cliente"
      });
    }
  }
  @Get('clientes')
  async allCLientes(){
    return await this.clienteService.allClientes();
  }
  @Get('cliente/:email')
  async findByOne(@Param('email')email:string){
    return await this.clienteService.findOne(email);
  }
  @Delete('borrarCliente/:email')
  async deleteCliente(@Param('email') email:string, @Res() res:Response){
    const delet = await this.clienteService.deleteClient(email);
    if(delet){
      return res.status(201).json({
        massage: "Se borro correctamente"
      });
    }else{
      return res.status(499).json({
        massage: "No se pudo borrar correctamente"
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
      return res.status(499).json({
        massage: "No se pudo modificar correctamente"
      });
    }

  }
}
