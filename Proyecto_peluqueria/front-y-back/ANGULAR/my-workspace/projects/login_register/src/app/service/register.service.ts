
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteDatosDto } from '../model/ClienteDatosDto';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url:string = 'http://localhost:3000/clientes';
  url2:string = 'http://localhost:3000/users';
  constructor(private http:HttpClient, userService: UserService) { }
  registerCliente(email: string, nombre: string, apellido: string, password: string, telefono: string): Observable<ClienteDatosDto | any> {
    const nuevoCliente = {
      email,
      nombre,
      apellido,
      password,
      telefono
    };
    return this.http.post(`${this.url}/create`, nuevoCliente);
  }
}
