import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../service/cliente.service';
import { RouterModule, Router } from '@angular/router';
import { UserDatosDto } from '../../../model/UserDatosDto';
import { EmpleadoService } from '../../../service/empleado.service';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string;
  password:string;
  constructor(private clienteService :ClienteService, private empleadoService: EmpleadoService, private userService: UserService, private router: Router){}
  login(){
    this.userService.findUser(this.email,this.password).subscribe({
      next: (usuario: UserDatosDto) => {
        if (usuario) {
          localStorage.setItem('user', JSON.stringify(usuario))
          console.log(usuario)
          if(usuario.role === 'empleado'){
            this.empleadoService.getEmpleadoByEmail(usuario.email).subscribe({
              next: (empleado) => {
                this.empleadoService.setEmpleado(empleado);
                localStorage.setItem('empleado', JSON.stringify(empleado));
                this.router.navigate(['/home']);
              }
            });
          }
          else if(usuario.role === 'cliente'){
            this.clienteService.findUsu(usuario.email).subscribe({
              next: (cliente) => {
                localStorage.setItem('cliente', JSON.stringify(cliente));
                this.clienteService.setCliente(cliente);
                console.log(cliente)
                localStorage.setItem('cliente', JSON.stringify(cliente));
                this.router.navigate(['/home']);
              }
            });
          }
        }
      },
      error: () => {
      }
    })
  }
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

}
