import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitaAltaClienteDto } from '../model/CitaAltaClienteDto';
import { CitaAltaEmpleadoDto } from '../model/CitaAltaEmpleadoDto';
import { CitaDatosDto } from '../model/CitaDatosDto';
import { ErrorResponse } from '../model/ErrorResponse';
import { SuccessResponse } from '../model/SuccessResponse';
@Injectable({
  providedIn: 'root'
})


export class CitaService {
  url:string = 'http://localhost:3000/citas';
  constructor(private http:HttpClient) { }
  crearCitaCliente(cita: CitaAltaClienteDto): Observable<CitaDatosDto | ErrorResponse> {
    return this.http.post<any>(`${this.url}/alta-cita-cliente`, cita);
  }
  crearCitaEmpleado(cita: CitaAltaEmpleadoDto): Observable<CitaDatosDto | ErrorResponse> {
    return this.http.post<any>(`${this.url}/alta-cita-empleado`, cita);
  }
  obtenerCitas(): Observable<CitaDatosDto[]> {
    return this.http.get<CitaDatosDto[]>(`${this.url}/todas`);
  }
  modificarCita(id: number, cita: CitaAltaClienteDto): Observable<SuccessResponse | ErrorResponse> {
    return this.http.patch<any>(`${this.url}/modificar-cita/${id}`, cita);
  }
  eliminarCita(id: number): Observable<SuccessResponse | ErrorResponse> {
    return this.http.delete<any>(`${this.url}/eliminar-cita/${id}`);
  }
  getMisCitas(email: string): Observable<CitaDatosDto[]> {
    return this.http.get<CitaDatosDto[]>(`${this.url}/buscar-cita-por-cliente/${email}`);
  }
}
