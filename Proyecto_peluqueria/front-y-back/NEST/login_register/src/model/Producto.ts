import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PedidoProducto } from './PedidoProducto';
import { Categoria } from './Categoria';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  id_categoria:number;
  @ManyToOne(() => Categoria, categoria => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;


  @Column()
  stock: number;

  @OneToMany(() => PedidoProducto, pp => pp.producto)
  pedidosProductos: PedidoProducto[];

  constructor(nombre?: string, descripcion?: string, precio?: number, stock?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
  }
}