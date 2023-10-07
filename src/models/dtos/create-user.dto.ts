import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../tables/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'name',
  'nickname',
] as const) {}
