import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../tables/user.entity';

export class UpdateUserDto extends PickType(UserEntity, [
  'id',
  'nickname',
] as const) {}
