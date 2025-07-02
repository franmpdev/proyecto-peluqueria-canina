import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ClienteDatosDto } from '../../../model/ClienteDatosDto';
import { ClienteService } from '../../../service/cliente.service';
import { RegisterService } from '../../../service/register.service';
import { UserService } from '../../../service/user.service';
import { UserAltaDto } from '../../../model/UserAltaDto';


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
  constructor(private registerService:RegisterService, private clienteService: ClienteService, private router: Router, private userService: UserService){}
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
        localStorage.setItem('cliente', JSON.stringify(cliente))
        this.clienteService.setCliente(cliente);
        this.userService.createUser(new UserAltaDto(cliente.email, this.password, 'cliente')).subscribe({
          next: (user)=>{
            console.log(user);
            this.router.navigate(['/home']);
            localStorage.setItem('user', JSON.stringify(user))
          }
        })
      }
    });
  }
    goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
