import { IsNumber, Min } from "class-validator";
export class PedidoProductoAltaDto {
  @IsNumber()
  id_producto: number;
  @IsNumber()
  @Min(1)
  cantidad: number;

  constructor(id_producto: number, cantidad: number) {
    this.id_producto = id_producto;
    this.cantidad = cantidad;
  }
}