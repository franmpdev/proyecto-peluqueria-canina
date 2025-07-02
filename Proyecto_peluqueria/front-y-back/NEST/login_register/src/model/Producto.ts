import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './Categoria';
import { PedidoProducto } from './PedidoProducto';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column()
  precio: number;

  @Column() 
  id_categoria: number;

  @Column()
  stock: number;

  @OneToMany(() => PedidoProducto, (pedidoProducto) => pedidoProducto.producto)
  pedidosProductos: PedidoProducto[];

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })  
  categoria: Categoria;

  /* Constructor con los mismos parámetros que tenías */
  constructor(nombre?: string, descripcion?: string, precio?: number, stock?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
  }
}