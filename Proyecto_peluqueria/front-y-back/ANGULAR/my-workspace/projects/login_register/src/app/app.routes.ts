import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoginComponent } from './views/auth/login/login.component';
import { MisMascotasComponent } from './views/usuario/mascotas/mis-mascotas/mis-mascotas.component';
import { NuevaMascotaComponent } from './views/usuario/mascotas/nueva-mascota/nueva-mascota.component';
import { GestionCitasComponent } from './views/admin/citas/gestion-citas/gestion-citas.component';
import { NuevaCitaEmpleadoComponent } from './views/admin/citas/nueva-cita-empleado/nueva-cita-empleado.component';
import { MisEmpleadosComponent } from './views/admin/empleados/mis-empleados/mis-empleados.component';
import { NuevoEmpleadoComponent } from './views/admin/empleados/nuevo-empleado/nuevo-empleado.component';
import { MascotasComponent } from './views/admin/mascotas/mascotas.component';
import { NuevaCitaClienteComponent } from './views/usuario/citas/nueva-cita-cliente/nueva-cita-cliente.component';
import { MisCitasComponent } from './views/usuario/citas/mis-citas/mis-citas.component';
import { ProductosComponent } from './views/admin/productos/productos.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { TiendaComponent } from './views/usuario/tienda/tienda.component';
import { PedidosComponent } from './views/usuario/pedidos/pedidos.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'nueva-mascota',
    component: NuevaMascotaComponent
  },
  {
    path: 'mis-mascotas',
    component: MisMascotasComponent
  },
  {
    path: 'tienda',
    component: TiendaComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mis-pedidos',
    component: PedidosComponent
  },
  //EMPLEADOS, SOLO PARA ROL ADMINISTRADOR
  {
    path: 'mis-empleados',
    component: MisEmpleadosComponent
  },
  {
    path: 'nuevo-empleado',
    component: NuevoEmpleadoComponent
  },
  {
    path: 'gestion-mascotas',
    component: MascotasComponent
  },
  {
    path: 'nueva-cita-cliente',
    component: NuevaCitaClienteComponent
  },

  {
    path: 'mis-citas',
    component: MisCitasComponent
  },

  {
    path: 'gestion-citas',
    component: GestionCitasComponent
  },
  {
    path: 'nueva-cita-empleado',
    component: NuevaCitaEmpleadoComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
