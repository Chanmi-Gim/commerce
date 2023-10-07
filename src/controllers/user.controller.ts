import { Controller } from '@nestjs/common';
import { UserService } from 'src/providers/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}
}
