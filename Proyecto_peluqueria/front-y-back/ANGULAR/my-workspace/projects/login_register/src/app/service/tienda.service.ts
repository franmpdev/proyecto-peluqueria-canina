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
  private apiUrl = 'http://localhost:3000/tienda';

  constructor(private http: HttpClient) {}

  obtenerPedidos(email: string): Observable<PedidoDatosDto[]> {
    return this.http.get<PedidoDatosDto[]>(`${this.apiUrl}/pedidos/${email}`);
  }
  crearPedido(pedido: PedidoAltaDto): Observable<Partial<PedidoDatosDto>> {
    console.log(pedido)
    return this.http.post<Partial<PedidoDatosDto>>(`${this.apiUrl}/pedidos`, pedido);
  }
}
