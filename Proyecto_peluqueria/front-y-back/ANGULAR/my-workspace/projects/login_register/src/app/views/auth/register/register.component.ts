import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ClienteDatosDto } from '../../../model/ClienteDatosDto';
import { ClienteService } from '../../../service/cliente.service';
import { RegisterService } from '../../../service/register.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  telefono: string = '';
  constructor(private registerService:RegisterService, private clienteService: ClienteService  ,private router: Router){}
  registrarCliente() {
    this.registerService.registerCliente(
      this.email,
      this.nombre,
      this.apellido,
      this.password,
      this.telefono
    ).subscribe({
      next: (cliente: ClienteDatosDto) => {
        // Maneja el éxito (puedes mostrar un mensaje o redirigir)
        console.log('Cliente registrado:', cliente);
        localStorage.setItem('cliente', JSON.stringify(cliente))
        localStorage.setItem('user', JSON.stringify(cliente))
        this.clienteService.setCliente(cliente);
      },
      error: (error) => {
        // Maneja el error
        console.error('Error al registrar cliente:', error);
      }
    });
  }
    goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
