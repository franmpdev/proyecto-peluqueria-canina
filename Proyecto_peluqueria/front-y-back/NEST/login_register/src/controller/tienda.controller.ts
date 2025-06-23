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
import { PedidoAltaDto } from 'src/dto/PedidoAltaDto';


@Controller('tiendas')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  @Post('pedidos/nuevoPedido')
  async crearPedidoCompleto(
    @Body() dto: PedidoAltaDto): Promise<{ id_pedido: number }> {
    const id_pedido = await this.tiendaService.crearPedidoConProductos(dto);
    return { id_pedido };
  }

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