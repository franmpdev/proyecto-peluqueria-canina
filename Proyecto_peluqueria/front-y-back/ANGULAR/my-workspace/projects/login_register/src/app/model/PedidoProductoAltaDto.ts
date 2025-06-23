import { ProductoDatosDto } from "./ProductoDatosDto";

export class PedidoProductoAltaDto {
  producto: ProductoDatosDto;
  cantidad: number;
  constructor(producto: ProductoDatosDto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}
