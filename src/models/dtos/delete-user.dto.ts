import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../tables/user.entity';

export class DeleteUserDto extends PickType(UserEntity, [
  'nickname',
] as const) {}
