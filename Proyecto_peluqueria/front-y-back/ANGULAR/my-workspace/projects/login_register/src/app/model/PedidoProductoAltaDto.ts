export class PedidoProductoAltaDto {
  id_producto: number;
  cantidad: number;

  constructor( id_producto: number, cantidad: number) {
    this.id_producto = id_producto;
    this.cantidad = cantidad;
  }
}
