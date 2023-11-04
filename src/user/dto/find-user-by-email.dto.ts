import { User } from '../entities/user.entity';
import { IsEmail } from 'class-validator';

export class FindUserByEmailDto extends User {
  @IsEmail()
  email: string;
}
