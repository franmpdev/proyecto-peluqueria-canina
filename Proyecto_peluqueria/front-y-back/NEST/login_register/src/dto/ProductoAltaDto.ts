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
  id_categoria: number;
  
  @IsNumber()
  @Min(0)
  stock: number;



  constructor(
    nombre: string,
    descripcion: string,
    precio: number,
    id_categoria: number,
    stock: number,
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.id_categoria = id_categoria;
    this.stock = stock;
  }
}