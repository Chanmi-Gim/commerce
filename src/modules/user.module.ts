import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from 'src/config/typeorm/custom-typeorm.module';
import { UserController } from 'src/controllers/user.controller';
import { UserRepository } from 'src/models/repositories/user.repository';
import { UserService } from 'src/providers/user.service';

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
