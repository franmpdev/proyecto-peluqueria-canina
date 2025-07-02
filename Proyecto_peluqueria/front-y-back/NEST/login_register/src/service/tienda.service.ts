import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAltaDto } from 'src/dto/PedidoAltaDto';
import { PedidoDatosDto } from 'src/dto/PedidoDatosDto';
import { PedidoProductoAltaDto } from 'src/dto/PedidoProductoAltaDto';
import { PedidoProductoDatosDto } from 'src/dto/PedidoProductoDatosDto';
import { ProductoDatosDto } from 'src/dto/ProductoDatosDto';
import { Pedido } from 'src/model/Pedido';
import { PedidoProducto } from 'src/model/PedidoProducto';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoProducto)
    private readonly pedidoProductoRepo: Repository<PedidoProducto>, 
  ) {}

  async todosLosPedidos(): Promise<PedidoDatosDto[]> {
    const pedidos = await this.pedidoRepo.find({
      relations: ['pedidosProductos', 'pedidosProductos.producto', 'pedidosProductos.producto.categoria'],
    })
    const pedidosDto: PedidoDatosDto[] = [];
    for (const pedido of pedidos) {
      const productosDto: PedidoProductoDatosDto[] = [];
      for (const pedProd of pedido.pedidosProductos) {
        const producto = pedProd.producto;
        const productoDto = new ProductoDatosDto(
          producto.id,
          producto.nombre,
          producto.descripcion,
          producto.precio,
          producto.categoria?.id_categoria,
          producto.stock
        );
        const pedProdDto = new PedidoProductoDatosDto(productoDto, pedProd.cantidad);
        productosDto.push(pedProdDto);
      }
      const pedidoDto = new PedidoDatosDto(
        pedido.id,
        pedido.emailCliente,
        productosDto,
        pedido.fecha
      );
      pedidosDto.push(pedidoDto);
    }
    return pedidosDto;
  }

  //Crear un pedido y obtener su ID
  async crearPedidoConProductos(dto: PedidoAltaDto): Promise<number> {
  const pedido = this.pedidoRepo.create({
    emailCliente: dto.email_cliente,
    fecha:        new Date(dto.fecha),
  });
  const guardado = await this.pedidoRepo.save(pedido);

  //Añade los productos al pedido
  for (const linea of dto.productos) {
    const pp = this.pedidoProductoRepo.create({
      pedido:   guardado,
      producto: { id: linea.id_producto } as Producto,
      cantidad: linea.cantidad,
    });
    await this.pedidoProductoRepo.save(pp);
  }

  return guardado.id;
}
  
  //Buscar los pedidos del cliente
  async findPedidosByClient(email: string): Promise<PedidoDatosDto[]> {
    const pedidos = await this.pedidoRepo.find({
      where: { emailCliente: email },
      relations: ['pedidosProductos', 'pedidosProductos.producto'],
    });
    const pedidosDto: PedidoDatosDto[] = [];
    for (const pedido of pedidos) {
      const productosDto: PedidoProductoDatosDto[] = [];
      for (const pedProd of pedido.pedidosProductos) {
        const producto = pedProd.producto;
        const productoDto = new ProductoDatosDto(
          producto.id,
          producto.nombre,
          producto.descripcion,
          producto.precio,
          producto.categoria?.id_categoria,
          producto.stock
        );
        const pedProdDto = new PedidoProductoDatosDto(productoDto, pedProd.cantidad);
        productosDto.push(pedProdDto);
      }
      const pedidoDto = new PedidoDatosDto(
        pedido.id,
        pedido.emailCliente,
        productosDto,
        pedido.fecha
      );
      pedidosDto.push(pedidoDto);
    }
    return pedidosDto;
  }
  async modificarPedido(id:number, dto:PedidoAltaDto):Promise<boolean>{
    const result = await this.pedidoRepo.update(id, dto);
    return result.affected>0;
  }
  async cancelarPedido(id: number): Promise<boolean> {
    const result = await this.pedidoRepo.delete(id);
    return result.affected > 0;
  }
}

