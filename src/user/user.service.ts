import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: findUserByEmailDto,
    });

    return {
      ...user,
      password: undefined,
    };
  }
}
