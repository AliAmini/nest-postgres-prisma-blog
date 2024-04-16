import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({email, password, name}: SignupDto) {
    const emailAlreadyExists = this.checkEmailExists(email);
    if(emailAlreadyExists) throw new ConflictException(`${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType: UserType.MEMBER
      }
    });

    console.log({hashedPassword, user});

    return user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ 
      where: {email: email}
    });

    return Boolean(user);
  }
}
