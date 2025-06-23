import { IsString, IsNumber, Min, IsPositive } from 'class-validator';

export class ProductoAltaDto {
  @IsString()
  nombre: string;
  @IsString()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  id_categoria: number;

  constructor(
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    id_categoria: number
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.id_categoria = id_categoria;
  }
}