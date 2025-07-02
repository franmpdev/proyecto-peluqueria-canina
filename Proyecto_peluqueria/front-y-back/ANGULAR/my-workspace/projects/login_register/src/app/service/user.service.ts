import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDatosDto } from '../model/UserDatosDto';
import { UserAltaDto } from '../model/UserAltaDto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:3000/users';
  user: any = null;
  constructor(private http: HttpClient) {}
  createUser(user: UserAltaDto): Observable<UserDatosDto> {
    return this.http.post<UserDatosDto>(`${this.url}/create`, user);
  }
  findUser(email: string, password: string): Observable<UserDatosDto | null> {
    return this.http.get<UserDatosDto>(`${this.url}/findUser/${email},${password}`);
  }
}
