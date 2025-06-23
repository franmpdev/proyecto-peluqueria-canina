import { PedidoProductoAltaDto } from "./PedidoProductoAltaDto";

export class PedidoAltaDto {
  email_cliente: string;
  productos: PedidoProductoAltaDto[];
  fecha: Date;
  constructor(email_cliente: string, fecha: Date, productos: PedidoProductoAltaDto[]) {
    this.email_cliente = email_cliente;
    this.productos=productos;
    this.fecha = fecha;
  }
}
