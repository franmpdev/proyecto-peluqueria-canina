import { Component } from '@angular/core';
import { TiendaService } from '../../../service/tienda.service';
import { PedidoDatosDto } from '../../../model/PedidoDatosDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(private tiendaService: TiendaService){}
  pedidos: PedidoDatosDto[] = [];
  ngOnInit(){
    this.obtenerPedidos()
  }
  obtenerPedidos(){
    this.tiendaService.obtenerPedidos(JSON.parse(localStorage.getItem('user')).email).subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log(this.pedidos)
      },
      error: (error) => {

      }
    })
  }

}
