import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models/dtos/create-user.dto';
import { DeleteUserDto } from 'src/models/dtos/delete-user.dto';
import { UpdateUserDto } from 'src/models/dtos/update-user.dto';
import { UserRepository } from 'src/models/repositories/user.repository';
import { UserEntity } from 'src/models/tables/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUserNickname(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findByUserId(updateUserDto.id);
    if (!user) {
      throw new BadRequestException('이름을 수정할 유저를 못 찾았어요!');
    }
    if (user.nickname === updateUserDto.nickname) {
      throw new BadRequestException('수정할 이름이 이전과 동일합니다!');
    }
    await this.userRepository.save({ ...updateUserDto });
    return (await this.userRepository.findOne({
      select: {
        id: true,
        name: true,
        nickname: true,
        deletedAt: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        id: updateUserDto.id,
      },
    })) as UserEntity;
  }

  async findOneByUserId(userId: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new BadRequestException('해당하는 유저를 찾지 못했어요!');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(createUserDto);
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<boolean> {
    try {
      await this.userRepository.delete({ nickname: deleteUserDto.nickname });
      return true;
    } catch (err) {
      return false;
    }
  }
}
