
import {
  Controller,
  Get,
} from '@nestjs/common';
import { CategoriaService } from 'src/service/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get('allCategorias')
  mostrarTodos(){
    return this.categoriaService.allCategorias();
  }
}