import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Cita } from './Cita';

@Entity('mascotas')
export class Mascota {
  @PrimaryGeneratedColumn()
  id_mascota: number;

  @Column()
  email_cliente: string;

  @Column()
  nombre: string;

  @Column()
  raza: string;

  @Column()
  edad: number;

  @ManyToOne(() => Cliente, cliente => cliente.mascotas, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'email_cliente' }) 
  cliente: Cliente;

  @OneToMany(() => Cita, cita => cita.mascota)
  citas: Cita[];

  constructor(cliente?: Cliente, citas?: Cita[], nombre?: string, raza?: string, edad?: number) {
    this.cliente = cliente;
    this.email_cliente = cliente?.email;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    this.citas = citas;
    
  }
}