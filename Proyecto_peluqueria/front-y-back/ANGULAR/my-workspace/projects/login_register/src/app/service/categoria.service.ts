import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDatosDto } from '../model/CategoriaDatosDto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
constructor(private http:HttpClient) { }

  url:string= 'http://localhost:3000/categorias/allCategorias';

  allCategorias():Observable<CategoriaDatosDto[]>{
    return this.http.get<CategoriaDatosDto[]>(`${this.url}`);
  }

}
