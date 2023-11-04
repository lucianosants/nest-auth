import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(4, { message: 'senha precisa ter no mínimo 4 caracteres' })
  @MaxLength(20, { message: 'senha precisa ter no máximo 20 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca.',
  })
  password: string;

  @IsString()
  name: string;
}
