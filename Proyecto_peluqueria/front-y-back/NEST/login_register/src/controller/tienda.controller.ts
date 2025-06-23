import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { TiendaService } from './../service/tienda.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';


@Controller('tiendas')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  @Get('Productos')
  mostrarTodos(){
    return this.tiendaService.obtenerTodos();
  }

  @Post('altaArticulo')
  altaArticulo(@Body() dto:ProductoAltaDto){
    return this.tiendaService.crearArticulo(dto);
  }
      
  @Delete('borrarArticulo/:id')
  deleteArticulo(@Param('id') id:number){
    return this.tiendaService.eliminarArticulo(id);
  }
  @Get('/pedidos/:email')
  async buscarPedidosPorCliente(@Param('email') email:string, @Res() res:Response){
    const pedidos = await this.tiendaService.findPedidosByClient(email)
    if(pedidos.length>0){
      return res.status(200).json(pedidos);
    }
    return res.status(404).send('No se encontraron pedidos')
  }
}