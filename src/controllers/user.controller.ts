import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/models/dtos/create-user.dto';
import { DeleteUserDto } from 'src/models/dtos/delete-user.dto';
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
import { UserService } from 'src/providers/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Get('search')
  async getAllUser({ search, target }: { search: string; target: string }) {
    return await this.userSerivce.findAll(search, target);
  }

  @Get(':id')
  async getUser(@Param('id') userId: number) {
    return await this.userSerivce.findOneByUserId(userId);
  }

  @Get()
  async getAll() {
    const users = await this.userSerivce.findAll();
    return users;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, 'createUserDto');
    return await this.userSerivce.create(createUserDto);
  }

  @Delete()
  async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return await this.userSerivce.delete(deleteUserDto);
  }

  @Put()
  async updateUserName(@Body() updateUserDto: UpdateUserDto) {
    return await this.userSerivce.updateUserNickname(updateUserDto);
  }
}
