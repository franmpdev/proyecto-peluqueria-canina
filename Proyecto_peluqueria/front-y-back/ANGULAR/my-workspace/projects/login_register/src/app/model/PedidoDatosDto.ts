import { PedidoProductoDatosDto } from "./PedidoProductoDatosDto";

export interface PedidoDatosDto {
  id_pedido: number;
  email_cliente: string;
  pedidoproductos: PedidoProductoDatosDto[];
  fecha: Date;
}
