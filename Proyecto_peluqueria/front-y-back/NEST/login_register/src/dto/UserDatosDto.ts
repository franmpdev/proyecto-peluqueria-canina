import { Usuario } from "src/model/Usuario";

export class UserDatosDto {
  id: number;
  email: string;
  role: string;

  constructor(user: Usuario){
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }
}