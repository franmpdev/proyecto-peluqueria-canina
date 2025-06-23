import { PedidoProductoDatosDto } from "./PedidoProductoDatosDto";

export class PedidoDatosDto {
  id_pedido: number;  
  email_cliente: string;
  pedidoproductos: PedidoProductoDatosDto[];
  fecha: Date;
  constructor(id_pedido: number, email_cliente: string, pedidoproductos: PedidoProductoDatosDto[],fecha: Date,) {
    this.id_pedido = id_pedido;
    this.email_cliente = email_cliente;
    this.pedidoproductos = pedidoproductos;
    this.fecha = fecha;
  }
}