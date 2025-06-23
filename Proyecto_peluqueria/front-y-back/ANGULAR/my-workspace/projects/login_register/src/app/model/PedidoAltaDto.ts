import { PedidoProductoAltaDto } from "./PedidoProductoAltaDto";

export class PedidoAltaDto {
  email_cliente: string;
  fecha: Date;
  productos: PedidoProductoAltaDto[];

  constructor(
    email_cliente: string,
    fecha: Date,
    productos: PedidoProductoAltaDto[],
  ) {
    this.email_cliente = email_cliente;
    this.fecha = fecha;
    this.productos = productos;
  }
}


