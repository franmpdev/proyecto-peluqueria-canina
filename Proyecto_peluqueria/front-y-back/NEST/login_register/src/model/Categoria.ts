import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from "./Producto";

@Entity('productos')
export class Categoria {

  @PrimaryGeneratedColumn()
  id_categoria: number;
    
  @Column()
  nombre: string;
  
  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}