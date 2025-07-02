import { Categoria } from "src/model/Categoria";

export class CategoriaDatosDto{
    
  id_categoria: number;
  nombre: string;

  constructor(categoria: Categoria) {
    this.id_categoria = categoria.id_categoria;
    this.nombre = categoria.nombre;
  }
}