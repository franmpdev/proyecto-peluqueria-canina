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
import { CitaService } from 'src/service/cita.service';
import {Response} from 'express';
import { CitaAltaEmpleadoDto } from 'src/dto/CitaAltaEmpleadoDto';
import { CitaAltaClienteDto } from 'src/dto/CitaAltaClienteDto';
import { CitaAltaDto } from 'src/dto/CitaAltaDto';
import { CitaDatosDto } from 'src/dto/CitaDatosDto';
@Controller('citas')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}
    @Get('todas')
    async todasCitas(@Res() res:Response){
      const citas = await this.citaService.findAllCitas();
      return res.status(200).json(citas);
    }
    @Get('buscar-cita-por-cliente/:email')
    async buscarCitaPorCliente(@Param('email') email:string, @Res() res:Response){
      const citas = await this.citaService.findQuotesByClient(email)
      if(citas.length>0){
        return res.status(200).json(citas);
      }
      else{
        return res.status(404).json({message:"Todavia no tienes citas",});
      }
      
    }
    //CITA RESERVADA POR UN CLIENTE EN LA WEB
    @Post('alta-cita-cliente')
    async altaCitaCliente(@Body() cita:CitaAltaClienteDto, @Res() res:Response){
      const creada = await this.citaService.highQuoteByClient(cita);
      if(creada){
        return res.status(201).json(creada);
      }else{
        return res.status(404).json(
          {
            message: 'Ya existe una cita en la hora seleccionada'
          }
        );
      }
    }
    //CITA RESERVADA POR UN EMPLEADO A UN CLIENTE NUEVO
    @Post('alta-cita-empleado')
    async altaCitaEmpleado(@Body() cita:CitaAltaEmpleadoDto, @Res() res:Response){
      const creada = await this.citaService.highQuoteByEmployee(cita);
      if(creada){
        return res.status(201).json(
        {
          message: 'Cita creada',
          cita: creada
        });
      }else{
        return res.status(404).json({
            message: 'Ya existe una cita en la hora seleccionada'
        });
      }
    }
    @Patch('modificar-cita')
    modificarCita(@Body()id: number, @Body() cita:CitaAltaDto,  @Res() res:Response){
      if(this.citaService.modifyQuote(id, cita)){
        return res.status(200).json({message:"has modificado la cita con exito",});
      }
      return res.status(404).json({message:"no se encuentra la cita",});
    }
    @Delete('eliminar-cita/:id')
    async EliminarCita(@Param('id') id:number, @Res() res:Response){
      const eli= await this.citaService.deleteQuote(id);
      if(eli){
        return res.status(200).json({message:"has eliminado la cita con exito",});}
      else{
        return res.status(404).json({message:"no se encuentra la cita",});
      };
    }
  }