import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { ProductoDatosDto } from 'src/dto/ProductoDatosDto';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  
  constructor(
    @InjectRepository(Producto) private repositoryProducto: Repository<Producto>
  ){}
  
  // ALTA PRODUCTO  

  async highProduct(dto: ProductoAltaDto): Promise<ProductoDatosDto | boolean> {
    // 1️ Evita duplicados buscando por nombre y descripción
    const existe = await this.repositoryProducto.findOne({
      where: { nombre: dto.nombre, descripcion: dto.descripcion },
    });
    if (existe) {
      return false;
    }

    // 2️ Crea y guarda
    const entidad = this.repositoryProducto.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio: dto.precio,
      stock: dto.stock,
      categoria: { id_categoria: dto.id_categoria } as any,
    });
    const creado = await this.repositoryProducto.save(entidad);

    // 3️ Devuelve DTO de datos
    return new ProductoDatosDto(
      creado.id,
      creado.nombre,
      creado.descripcion,
      creado.categoria.id_categoria,
      creado.precio,
      creado.stock,
    );
  }

  //BAJA PRODUCTO

  async deleteProduct(id:number):Promise<boolean>{
    await this.repositoryProducto.delete(id);
    return true;
  }
  
  //MODIFICAR PRODUCTO

  async modifyProduct(id: number, dto: ProductoAltaDto): Promise<boolean> {
  const result = await this.repositoryProducto.update(id, dto);
  return result.affected > 0;
}

  //MOSTRAR TODOS LOS PRODUCTOS

  async findAllProduct(): Promise<ProductoDatosDto[]> {
    const productos = await this.repositoryProducto.find(
      {
        relations: ['categoria']
      }
    );
    const productosDto: ProductoDatosDto[] = [];

    for (const prods of productos) {
      productosDto.push(
        new ProductoDatosDto(
          prods.id,
          prods.nombre,
          prods.descripcion,
          prods.precio,
          prods.categoria.id_categoria,
          prods.stock,
        )
      );
    }
    return productosDto;
  }
}
