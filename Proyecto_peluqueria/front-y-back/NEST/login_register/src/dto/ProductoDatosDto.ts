import { Producto } from "src/model/Producto";

export class ProductoDatosDto {

  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  id_categoria:number;
  stock: number;

  constructor(producto: Producto){
    this.id_producto = producto.id;
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.id_categoria = producto.categoria?.id_categoria;
    this.stock = producto.stock;
  }
}