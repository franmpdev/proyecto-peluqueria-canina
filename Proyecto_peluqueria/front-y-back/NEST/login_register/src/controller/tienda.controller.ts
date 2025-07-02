import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { TiendaService } from './../service/tienda.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PedidoAltaDto } from 'src/dto/PedidoAltaDto';


@Controller('tienda')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}
  @Get('')
  mostrarTodos(){
    return this.tiendaService.todosLosPedidos();
  }
  @Get('/pedidos/:email')
  async buscarPedidosPorCliente(@Param('email') email:string, @Res() res:Response){
    const pedidos = await this.tiendaService.findPedidosByClient(email)
    if(pedidos.length>0){
      return res.status(200).json(pedidos);
    }
    return res.status(404).send('No se encontraron pedidos')
  }
  @Put('/pedidos/:id')
  async modificarPedido(@Param('id') id:number, @Body() dto:PedidoAltaDto, @Res() res:Response){
    const modificado = await this.tiendaService.modificarPedido(id, dto);
    if(modificado){
      return res.status(200).json(modificado);
    }
    return res.status(404).send('No se encontro el pedido')
  }
  @Post('pedidos/nuevoPedido')
  async crearPedidoCompleto(
    @Body() dto: PedidoAltaDto): Promise<{ id_pedido: number }> {
    const id_pedido = await this.tiendaService.crearPedidoConProductos(dto);
    return { id_pedido };
  }

}