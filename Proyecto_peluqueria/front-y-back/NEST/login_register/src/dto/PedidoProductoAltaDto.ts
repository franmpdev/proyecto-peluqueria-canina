import { IsInt, IsObject } from "class-validator";
import { ProductoDatosDto } from "./ProductoDatosDto";

export class PedidoProductoAltaDto {
  @IsInt()
  id_pedido: number;
  @IsObject()
  producto: ProductoDatosDto; 
  @IsInt()
  cantidad: number;

  constructor(id_pedido: number, producto: ProductoDatosDto, cantidad: number) {
    this.id_pedido = id_pedido;
    this.producto = producto;
    this.cantidad = cantidad;
  }
}