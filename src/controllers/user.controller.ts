import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from 'src/models/tables/user.entity';
import { UserService } from 'src/providers/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Put(':id')
  async updateUserName(@Param('id', ParseIntPipe) userId: number) {}

  @Delete(':id')
  async deleteUSer(@Param('id', ParseIntPipe) userId: number) {}

  @Post()
  async create(@Body() createUserDto) {}

  @Get()
  async getAll() {
    const users = await this.userSerivce.findAll();
    return users;
  }
}
