import { PedidoProducto } from "src/model/PedidoProducto";
import { Producto } from "src/model/Producto";


export class PedidoProductoDatosDto {
  id_pedido: number;
  producto: Producto;
  cantidad: number;

  constructor(pedidoproducto: PedidoProducto) {
    this.id_pedido = pedidoproducto.pedido.id;
    this.producto = pedidoproducto.producto;
    this.cantidad = pedidoproducto.cantidad;
  }
}