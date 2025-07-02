
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

  @Get('pedidos')
  async mostrarTodos(@Res() res: Response) {
    const pedidos = await this.tiendaService.todosLosPedidos();
    return res.status(200).json(pedidos);
  }

  @Get('/pedidos/:email')
  async buscarPedidosPorCliente(@Param('email') email: string, @Res() res: Response) {
    const pedidos = await this.tiendaService.findPedidosByClient(email);
    if (pedidos.length > 0) {
      return res.status(200).json(pedidos);
    }
    return res.status(404).send('No se encontraron pedidos');
  }

  @Put('/pedidos/:id')
  async modificarPedido(@Param('id') id: number, @Body() dto: PedidoAltaDto, @Res() res: Response) {
    const modificado = await this.tiendaService.modificarPedido(id, dto);
    if (modificado) {
      return res.status(200).json(modificado);
    }
    return res.status(404).send('No se encontró el pedido');
  }

  @Post('pedidos')
  async crearPedidoCompleto(@Body() dto: PedidoAltaDto, @Res() res: Response) {
    const id_pedido = await this.tiendaService.crearPedidoConProductos(dto);
    return res.status(201).json({ id_pedido });
  }
  @Delete('cancelarPedido/:id')
  async eliminarPedido(@Param('id') id: number, @Res() res: Response) {
    const eliminado = await this.tiendaService.cancelarPedido(id)
    if (eliminado) {
      return res.status(200).json({
        message: 'Pedido eliminado correctamente',
      });
    }
    return res.status(404).send('No se encontró el pedido');
    }
}
