import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductoAltaDto } from '../../../model/ProductoAltaDto';
import { ProductoDatosDto } from '../../../model/ProductoDatosDto';
import { ProductosService } from '../../../service/productos.service';
import { CategoriaDatosDto } from '../../../model/CategoriaDatosDto';
import { CategoriaService } from '../../../service/categoria.service';
@Component({
  selector: 'app-productos',
  imports: [FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  idEliminar: number;
  nombre: string;
  precio: number;
  descripcion: string;
  productos: ProductoDatosDto[];
  productoSeleccionado: ProductoDatosDto | null = null;
  nuevonombre: string;
  nuevoprecio: number;
  nuevodescripcion: string;
  mensajeAlta:string;
  mensajeEliminar: string;
  mensajeUpdate: string;
  categorias: CategoriaDatosDto[];
  categoriaID: number;
  nuevostock: number;
  constructor(private categoriaService: CategoriaService,private productosService: ProductosService) {}
  ngOnInit(){
    this.categoriaService.allCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        console.log(categorias)
      }
    });
    this.mostrarProductos();
  }
  // Crear un nuevo producto
  crearProducto() {
    const nuevoProducto = new ProductoAltaDto(
      this.nuevonombre,
      this.nuevodescripcion,
      this.nuevoprecio,
      this.categoriaID,
      this.nuevostock
    );
    this.productosService.newProduct(nuevoProducto).subscribe({
      next: (data) => {
        this.mensajeAlta = data && data.message ? data.message : 'Producto creado correctamente.';
        this.mostrarProductos();
        setTimeout(()=>{
        this.nuevonombre = null
        this.nuevoprecio = null;
        this.nuevodescripcion = null
        this.mensajeAlta = null
        }, 2000)
      }
    });
  }

  // Mostrar todos los productos
    mostrarProductos() {
      this.productosService.allProduct().subscribe({
        next: (productos) => {
          this.productos = productos;
        }
      });
    }
  // Seleccionar un producto para modificar
  seleccionarProducto(producto: ProductoDatosDto) {
    this.productoSeleccionado = { ...producto };
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.descripcion = producto.descripcion;
  }
  // Modificar el producto seleccionado
  modificarProducto() {
    if (!this.productoSeleccionado) return;
    const productoModificado = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      id_categoria: this.categoriaID,
      stock: this.nuevostock
    };
    this.productosService.modifyProducto(this.productoSeleccionado.id_producto, productoModificado).subscribe({
      next: (data) => {
        this.mensajeUpdate = data && data.message ? data.message : 'Producto modificado correctamente.';
        setTimeout(()=>{
          this.mostrarProductos();
          this.mensajeUpdate = null;
          this.productoSeleccionado = null;
          this.nombre = null;
          this.precio = null;
          this.descripcion = null;
          this.categoriaID = null;
          this.nuevostock = null;
        }, 2000)
      }
    });
  }
  // Eliminar un producto por su ID
  eliminarProducto(idEliminar: number) {
    if (!idEliminar) return;
    this.productosService.deleteProduct(idEliminar).subscribe({
      next: (data) => {
        this.mostrarProductos();
        this.mensajeEliminar ='Producto eliminado correctamente'
        setTimeout(()=>{
          this.mensajeEliminar = null;
        }, 2000)
      }
    })
  }
}
