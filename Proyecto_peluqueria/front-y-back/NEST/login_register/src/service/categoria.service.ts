import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaDatosDto } from "src/dto/CategoriaDatosDto";
import { Categoria } from "src/model/Categoria";
import { Repository } from "typeorm";

export class CategoriaService{
    constructor(
        @InjectRepository(Categoria) private repositoryCita: Repository<Categoria>,     
    ){}
      async allCategorias():Promise<CategoriaDatosDto[]>{
        const categorias = await this.repositoryCita.find();
        return categorias.map(categoria => new CategoriaDatosDto(categoria))
      }
}