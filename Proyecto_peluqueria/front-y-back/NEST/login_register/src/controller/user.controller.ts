import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserAltaDto } from 'src/dto/UserAltaDto';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: UserAltaDto, @Res() res: Response) {
    const result = await this.userService.create(createUserDto);
    return res.status(201).json(result);
  }

  @Get('findUser/:email,:password')
  async findOne(@Param('email') email: string, @Param('password') password: string, @Res() res: Response) {
    const user = await this.userService.findOne(email, password);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UserAltaDto, @Res() res: Response) {
    const updated = await this.userService.update(id, updateUserDto);
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({message: 'User updated successfully'});
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const deleted = await this.userService.remove(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  }
}
