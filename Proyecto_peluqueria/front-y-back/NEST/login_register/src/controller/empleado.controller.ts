import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { EmpleadoAltaDto } from 'src/dto/EmpeladoAltaDto';
import { EmpleadoService } from 'src/service/empleado.service';
import { Response } from 'express';

@Controller('empleados')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post('altaEmpleado')
  async altaEmpleado(@Body() empleado: EmpleadoAltaDto, @Res() res: Response) {
    const creada = await this.empleadoService.highEmployee(empleado);
    if (creada) {
      return res.status(201).json({
        message: 'Empleado creada',
      });
    } else {
      return res.status(409).json({
        message: 'Ya existe un empleado',
      });
    }
  }

  @Get('')
  async allEmpleados(@Res() res: Response) {
    const empleados = await this.empleadoService.allEmployees();
    return res.status(200).json(empleados);
  }

  @Get('findEmpleado/:email')
  async getEmpleadoByEmail(@Param('email') email: string, @Res() res: Response) {
    const empleado = await this.empleadoService.findEmployeeByEmail(email);
    if (empleado) {
      return res.status(200).json(empleado);
    } else {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
  }

  @Get('findEmpleadoByDni/:dni')
  async getEmpleadoByDni(@Param('dni') dni: string, @Res() res: Response) {
    const empleado = await this.empleadoService.findEmpleadoByDni(dni);
    if (empleado) {
      return res.status(200).json(empleado);
    } else {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
  }

  @Patch('modificarEmpleado/:dni')
  async modifyEmpleado(
    @Param('dni') dni: string,
    @Body() empleado: EmpleadoAltaDto,
    @Res() res: Response,
  ) {
    const modificado = await this.empleadoService.modifyEmployee(dni, empleado);
    if (modificado) {
      return res.status(200).json({ message: 'Empleado modificado' });
    } else {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
  }

  @Delete('eliminarEmpleado/:dni')
  async deleteEmpleado(@Param('dni') dni: string, @Res() res: Response) {
    const delet = await this.empleadoService.deleteEmployee(dni);
    if (delet) {
      return res.status(200).json({
        message: 'Has eliminado al empleado',
      });
    } else {
      return res.status(404).json({
        message: 'No se ha encontrado al empleado',
      });
    }
  }
}
