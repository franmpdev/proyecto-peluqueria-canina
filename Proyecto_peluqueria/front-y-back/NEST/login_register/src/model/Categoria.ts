import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from './Producto';

@Entity('categorias') 
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id_categoria: number;

  @Column()
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  constructor(id_categoria?: number, nombre?: string, productos?: Producto[]) {
    this.id_categoria = id_categoria;
    this.nombre = nombre;
    this.productos = productos;
  }
}