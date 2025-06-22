import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "src/model/Categoria";
import { Repository } from "typeorm";

export class CategoriaService{
    constructor(
        @InjectRepository(Categoria) private repositoryCita: Repository<Categoria>,     
    ){}
      allCategorias():Promise<Categoria[]>{
        return this.repositoryCita.find();
      }
}