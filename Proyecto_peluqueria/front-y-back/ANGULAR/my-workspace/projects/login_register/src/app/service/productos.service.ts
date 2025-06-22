import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoAltaDto } from '../model/ProductoAltaDto';
import { Observable } from 'rxjs';
import { ProductoDatosDto } from '../model/ProductoDatosDto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
constructor(private http:HttpClient) { }

  url:string= 'http://localhost:3000/productos';

  allProduct():Observable<ProductoDatosDto[]>{
    return this.http.get<ProductoDatosDto[]>(`${this.url}/Productos`);
  }
  newProduct(nuevoProducto:ProductoAltaDto):Observable<any>{
    return this.http.post<any>(`${this.url}/altaProducto`,nuevoProducto);
  }
  deleteProduct(id:number):Observable<any> {
    return this.http.delete<any>(`${this.url}/eliminarProductos/${id}`);
  }
  modifyProducto(id: number, producto: Partial<ProductoDatosDto>): Observable<any> {
    return this.http.patch<any>(`${this.url}/modificarProducto/${id}`, producto);
  }
}
