import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAltaDto } from 'src/dto/PedidoAltaDto';
import { PedidoDatosDto } from 'src/dto/PedidoDatosDto';
import { PedidoProductoAltaDto } from 'src/dto/PedidoProductoAltaDto';
import { PedidoProductoDatosDto } from 'src/dto/PedidoProductoDatosDto';
import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
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

  // Mostrar
  async obtenerTodos(): Promise<Producto[]> {
    return await this.productoRepo.find();
  }

  // Añadir
  async crearArticulo(dto: ProductoAltaDto): Promise<any> {
    const pedidoProducto = this.productoRepo.create(dto);
    
    return await this.productoRepo.save(pedidoProducto);
  }


  //Eliminar
  async eliminarArticulo(id: number): Promise<void> {
    const resultado = await this.productoRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException("Artículo no encontrado");
    }
  }

  //Crear un pedido y obtener su ID
    async crearPedido(email: string): Promise<number> {
    const pedido = this.pedidoRepo.create({
      emailCliente: email,
      fecha: new Date(),
    });
    const pedidoGuardado = await this.pedidoRepo.save(pedido);
    return pedidoGuardado.id; // Aquí obtienes el ID del pedido creado
  }
  //Añadir un producto al pedido
  async añadirProductoAlPedido(dto: PedidoProductoAltaDto):Promise<boolean>{
    const pedidoProducto = this.pedidoProductoRepo.create(dto);
    await this.pedidoProductoRepo.save(pedidoProducto).catch(error => {
       return false;
    });
    return true;
  }
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

    console.log(pedidosDto);
    return pedidosDto;
  }
}

