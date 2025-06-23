import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoDatosDto } from '../model/PedidoDatosDto';
import { ProductoDatosDto } from '../model/ProductoDatosDto';
import { ProductoAltaDto } from '../model/ProductoAltaDto';
import { PedidoAltaDto } from '../model/PedidoAltaDto';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'http://localhost:3000/tiendas';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<ProductoDatosDto[]> {
    return this.http.get<ProductoDatosDto[]>(`${this.apiUrl}/Productos`);
  }

  altaProducto(producto: Partial<ProductoAltaDto>): Observable<ProductoDatosDto> {
    return this.http.post<ProductoDatosDto>(`${this.apiUrl}/altaArticulo`, producto);
  }

  borrarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrarArticulo/${id}`);
  }
  obtenerPedidos(email: string): Observable<PedidoDatosDto[]> {
    return this.http.get<PedidoDatosDto[]>(`${this.apiUrl}/pedidos/${email}`);
  }
  crearPedido(pedido: PedidoAltaDto): Observable<Partial<PedidoDatosDto>> {
    return this.http.post<Partial<PedidoDatosDto>>(`${this.apiUrl}/pedidos/nuevoPedido`, pedido);
  }
}
