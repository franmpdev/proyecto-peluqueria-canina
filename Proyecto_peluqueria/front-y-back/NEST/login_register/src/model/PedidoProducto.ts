import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './Pedido';
import { Producto } from './Producto';

@Entity('pedidos_productos')
export class PedidoProducto {
  @PrimaryColumn({ name: 'id_pedido' })
  idPedido: number;

  @PrimaryColumn({ name: 'id_producto' })
  idProducto: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Pedido, pedido => pedido.pedidosProductos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Producto, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  constructor(pedido?: Pedido, producto?: Producto, cantidad?: number) {
    this.pedido = pedido;
    this.idPedido = pedido?.id;
    this.producto = producto;
    this.idProducto = producto?.id;
    this.cantidad = cantidad;
  }
}