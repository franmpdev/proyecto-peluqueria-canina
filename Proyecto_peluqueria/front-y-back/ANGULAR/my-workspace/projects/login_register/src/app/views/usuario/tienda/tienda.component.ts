
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../service/productos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoDatosDto } from '../../../model/ProductoDatosDto';
import { PedidoProductoAltaDto } from '../../../model/PedidoProductoAltaDto';


@Component({
  selector: 'app-tienda',
  imports: [FormsModule,CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: ProductoDatosDto[] = [];
  carrito: PedidoProductoAltaDto[] = [];
  mensajeExito = false;

  constructor(private productoService: ProductosService) {}
  async ngOnInit() {
    this.cargarProductos();
  }
  cargarProductos(){
  this.productoService.allProduct().subscribe(
    {
      next: (productos) => {
        this.productos = productos;
        console.log(this.productos)
      }
    });
  }
  agregarAlCarrito(id_producto: number):void {
    const productoSeleccionado = this.productos.find(producto => producto.id_producto === id_producto);
    console.log(this.productos)
    const prod = this.carrito.find(pedidoproducto => pedidoproducto.producto.id_producto=== id_producto);
    if(!productoSeleccionado){
      return;
    }
    if(!prod){
      const nuevo = new PedidoProductoAltaDto(productoSeleccionado, 1)
      this.carrito.push(nuevo)
      console.log(nuevo)
    }
    return;
  }
  sumarAlPedido(id_producto:number) {
    let itemCarrito = this.carrito.find(p => p.producto.id_producto === id_producto);
    if(!itemCarrito)
      return;
    if(itemCarrito.producto.stock < itemCarrito.cantidad + 1)
      return;
    itemCarrito.cantidad+=1;
  }
  restarAlPedido(id_producto:number) {
    console.log('paso por aqui')
    let itemCarrito = this.carrito.find(p => p.producto.id_producto === id_producto);
    if(!itemCarrito)
      return;
    itemCarrito.cantidad-=1;
    if(itemCarrito.cantidad === 0){
      this.carrito = this.carrito.filter(el => el.cantidad>0)
    }
    return;
  }
  eliminarDelCarrito(id:number) {
    this.carrito = this.carrito.filter(i => i.producto.id_producto !== id);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0)
}
  pagar() {
    this.carrito = [];
    this.mensajeExito = true;
    setTimeout(() => this.mensajeExito = false, 3000);
  }
}
