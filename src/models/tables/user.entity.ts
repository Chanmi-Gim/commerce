import { Entity, Column } from 'typeorm';
import { DateColmuns } from '../date-columns';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity extends DateColmuns {
  @IsOptional()
  @Length(1, 100)
  @IsString()
  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string | null;

  @IsNotEmpty()
  @Length(1, 100)
  @IsString()
  @Column({ type: 'varchar', length: 100 })
  nickname!: string;
}
