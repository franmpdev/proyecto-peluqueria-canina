import { Pedido } from "src/model/Pedido";
import { PedidoProducto } from "src/model/PedidoProducto";

export class PedidoDatosDto {
  id_pedido: number;  
  email_cliente: string;
  pedidoproductos: PedidoProducto[];
  fecha: Date;
  constructor(pedido: Pedido) {
    this.id_pedido = pedido.id;
    this.email_cliente = pedido.emailCliente;
    this.pedidoproductos = pedido.pedidosProductos;
    this.fecha = pedido.fecha;
  }
}