import { ProductoDatosDto } from "./ProductoDatosDto";

export interface CategoriaDatosDto{

  id_categoria: number;
  nombre: string;
  productos: ProductoDatosDto[];

}
