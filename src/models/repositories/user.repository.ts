import { CustomRepository } from 'src/config/typeorm/custom-typeorm.decorator';
import { Repository } from 'typeorm';
import { UserEntity } from '../tables/user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findOneByName(name: string): Promise<UserEntity | null> {
    /**
     * TypeORM으로 Find를 할 때는 자동으로 deletedAt이 null이 아닌 값을 제외한다.
     * - withDeleted: true 사용 시 조회 가능
     */
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  async findByUserId(userId: number): Promise<UserEntity | null> {
    const user = await this.findOne({ where: { id: userId } });
    return user;
  }
}
