import { IsDate, IsEmail, Length } from "class-validator";
import { PedidoProductoAltaDto } from "./PedidoProductoAltaDto";

export class PedidoAltaDto {
  @IsEmail()
  email_cliente: string;
  @IsDate()
  fecha: string;

  productos: PedidoProductoAltaDto[];

  constructor(email_cliente: string, fecha: string, productos: PedidoProductoAltaDto[]) {
    this.email_cliente = email_cliente;
    this.fecha = fecha;
    this.productos = productos;
  }
}