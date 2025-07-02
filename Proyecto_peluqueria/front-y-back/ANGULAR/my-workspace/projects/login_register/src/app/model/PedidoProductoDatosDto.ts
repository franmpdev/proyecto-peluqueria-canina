import { ProductoDatosDto } from "./ProductoDatosDto";
export interface PedidoProductoDatosDto {
  id_pedido: number;
  producto: ProductoDatosDto;
  cantidad: number;
}
