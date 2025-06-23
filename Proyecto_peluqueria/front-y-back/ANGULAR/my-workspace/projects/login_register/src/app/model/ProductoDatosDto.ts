export class ProductoDatosDto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  id_categoria:number;
  precio: number;
  stock: number;

  constructor(id_producto?: number, nombre?: string, descripcion?: string, precio?: number, id_categoria?: number, stock?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.id_categoria = id_categoria;
    this.precio = precio;
    this.stock = stock;
    this.id_producto = id_producto;
  }
}
