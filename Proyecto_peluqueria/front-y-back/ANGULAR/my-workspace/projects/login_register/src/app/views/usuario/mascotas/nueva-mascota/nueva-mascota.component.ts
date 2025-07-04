
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MascotaAltaDto } from "../../../../model/MascotaAltaDto";
import { MascotaService } from "../../../../service/mascota.service";
import { ClienteService } from "../../../../service/cliente.service";
@Component({
  selector: 'app-nueva-mascota',
  imports: [FormsModule,CommonModule],
  templateUrl: './nueva-mascota.component.html',
  styleUrl: './nueva-mascota.component.css',
  providers: []
})
export class NuevaMascotaComponent {
  email_clienteMascota: string;
  nombreMascota: string;
  razaMascota: string;
  edadMascota: number;
  mensajeAlta: string;
  constructor(private mascotaService:MascotaService, private clienteService: ClienteService){}
  ngOnInit() {
    this.email_clienteMascota = this.clienteService.getCliente().email;
  }
  altaMascota() {
    let nuevaMascota = new MascotaAltaDto(this.email_clienteMascota, this.nombreMascota, this.razaMascota, this.edadMascota);
    this.mascotaService.altaMascota(nuevaMascota)
   .subscribe({
      next: mascota => {
    },
      error: err => {
        this.mensajeAlta = 'Error al crear la mascota.';
      }
    });
  }
}
