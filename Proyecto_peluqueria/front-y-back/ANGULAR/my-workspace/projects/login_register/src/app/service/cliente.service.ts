import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteDatosDto } from '../model/ClienteDatosDto';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url:string = 'http://localhost:3000/clientes';
  cliente: ClienteDatosDto | null = null;
  constructor(private http:HttpClient) { }
  findUsu(email:string):Observable<ClienteDatosDto>{
    const usuario =this.http.get<ClienteDatosDto>(`${this.url}/${email}`)
    return usuario;
  }
  setCliente(cliente: ClienteDatosDto): void {
    this.cliente = cliente;
  }
  getCliente(): ClienteDatosDto | null {
    if (this.cliente === null) {
      this.cliente = JSON.parse(localStorage.getItem('cliente') || '{}')
      return this.cliente;
    } else {
      return this.cliente;
    }
  }

  removeCliente():void{
    this.cliente = null;
  }
}
