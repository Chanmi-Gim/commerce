import { Entity, Column } from 'typeorm';
import { DateColmuns } from '../date-columns';

@Entity({ name: 'user' })
export class UserEntity extends DateColmuns {
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 100 })
  nickname: string;
}
