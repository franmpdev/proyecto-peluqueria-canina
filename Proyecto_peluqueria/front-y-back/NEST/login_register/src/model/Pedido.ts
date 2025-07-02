import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { PedidoProducto } from './PedidoProducto';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'id_pedido' })
  id: number;

  @Column({ name: 'email_cliente' })
  emailCliente: string;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos)
  @JoinColumn({ name: 'email_cliente', referencedColumnName: 'email' })
  cliente: Cliente;

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.pedido,  { onDelete: 'CASCADE' })
  pedidosProductos: PedidoProducto[];

  constructor(fecha?: Date, cliente?: Cliente, pedidosProductos?: PedidoProducto[]) {
    this.fecha = fecha ?? new Date();
    this.cliente = cliente;
    this.emailCliente = cliente?.email;
    if (pedidosProductos) {
      this.pedidosProductos = pedidosProductos;
    }
  }
}