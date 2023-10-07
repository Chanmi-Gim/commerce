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
import { CreateUserDto } from 'src/models/dtos/create-user.dto';
import { DeleteUserDto } from 'src/models/dtos/delete-user.dto';
import { UserEntity } from 'src/models/tables/user.entity';
import { UserService } from 'src/providers/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Put(':id/:name')
  async updateUserName(
    @Param('id') userId: number,
    @Param('name') name: string,
  ) {
    return await this.userSerivce.updateUserName(userId, name);
  }

  @Delete()
  async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return await this.userSerivce.delete(deleteUserDto);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userSerivce.create(createUserDto);
  }

  @Get()
  async getAll() {
    const users = await this.userSerivce.findAll();
    return users;
  }
}
