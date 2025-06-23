
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../service/productos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoDatosDto } from '../../../model/ProductoDatosDto';
import { PedidoProductoAltaDto } from '../../../model/PedidoProductoAltaDto';
import { PedidoAltaDto } from '../../../model/PedidoAltaDto';
import { TiendaService } from '../../../service/tienda.service';


@Component({
  selector: 'app-tienda',
  imports: [FormsModule,CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: ProductoDatosDto[] = [];
  carrito: ProductoDatosDto[] = [];
  pedidoProductos: PedidoProductoAltaDto[] = [];
  mensajeExito = false;

  constructor(private productoService: ProductosService, private tiendaService: TiendaService) {}
  async ngOnInit() {
    this.cargarProductos();
  }
  obtenerCantidad(id_producto: number): number {
  return this.pedidoProductos.find(p => p.id_producto === id_producto)?.cantidad || 0;
  }
  cargarProductos(){
  this.productoService.allProduct().subscribe(
    {
      next: (productos) => {
        this.productos = productos;
      }
    });
  }
  agregarAlCarrito(id_producto: number) {
    const producto = this.productos.find(p => p.id_producto === id_producto);
    if (!producto) return;

    const index = this.carrito.findIndex(p => p.id_producto === id_producto);
    if (index === -1) {
      this.carrito.push({ ...producto });
      this.pedidoProductos.push({ id_producto, cantidad: 1 });
    }
  }
  sumarAlPedido(id_producto: number) {
    const pedido = this.pedidoProductos.find(p => p.id_producto === id_producto);
    const producto = this.carrito.find(p => p.id_producto === id_producto);
    if (pedido && producto && pedido.cantidad < producto.stock) {
      pedido.cantidad++;
    }
  }
  restarAlPedido(id_producto: number) {
    const pedido = this.pedidoProductos.find(p => p.id_producto === id_producto);
    if (pedido) {
      pedido.cantidad--;
      if (pedido.cantidad <= 0) {
        this.eliminarDelCarrito(id_producto);
      }
    }
  }
  eliminarDelCarrito(id_producto: number) {
    this.carrito = this.carrito.filter(p => p.id_producto !== id_producto);
    this.pedidoProductos = this.pedidoProductos.filter(p => p.id_producto !== id_producto);
  }
  calcularTotal(): number {
    return this.pedidoProductos.reduce((total, pedido) => {
      const producto = this.carrito.find(p => p.id_producto === pedido.id_producto);
      return total + (producto ? producto.precio * pedido.cantidad : 0);
    }, 0);
  }
  pagar() {
    const email = JSON.parse(localStorage.getItem('user')).email;
    const payload = new PedidoAltaDto(email, new Date(), this.pedidoProductos)
    this.tiendaService.crearPedido(payload).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.carrito = [];
        this.pedidoProductos = [];
      },
      error: (error) => {
        console.error('Error al crear el pedido:', error);
      }
    });
  }
}
