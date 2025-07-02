import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriaService } from 'src/service/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get('allCategorias')
  async mostrarTodos(@Res() res: Response) {
    const categorias = await this.categoriaService.allCategorias();
    return res.status(200).json(categorias);
  }
}